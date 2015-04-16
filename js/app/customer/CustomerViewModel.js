define([
    'kendo',
    'text!customerTemplate'
], function (kendo, customerTemplate) {
    return kendo.data.ObservableObject.extend({
        customerDataSource: null,
        init: function (listView) {
            var self = this;            
            listView.kendoMobileListView({
                template: kendo.template(customerTemplate)
            });
            kendo.data.ObservableObject.fn.init.apply(self, []);
            var dataSource = new kendo.data.DataSource({
                transport: {
                        read: {
                            url: baseUrl+"/getAllCustomer/",
                            dataType: "json"
                        }
                    }               
            });
            self.set("customerDataSource", dataSource);
        },
        customer_edit_load: function (e) {
            var customerid=$(e.button).attr('data-customer-id');
            app.kendoApp.navigate('#customer_edit_view','slide:right');
            var selectedcustomer = null;                    
            var customerList = app.customerService.viewModel.customerDataSource ; 
            for (var i = 0; i < customerList._data.length; i++) {
                if (customerid == customerList._data[i].id) {
                    selectedcustomer = customerList._data[i];
                    break;
                }
            }     
            kendo.bind($("#customer_edit_view"), selectedcustomer);  
        },
        customer_edit_save: function (e) {
            
            var CustomerEdit = baseUrl + "/customerEdit"; 
            var model = $("#customer_edit_view").find("#email").get(0).kendoBindingTarget.source;            
            var url  = baseUrl ;
            if(model.id=-1)
                url = url + '/customerAdd' + '?name=' + model.name + '&street=' + model.street + '&pobox=' + model.zip + '&city=' + model.city + '&phone=' + model.phone + '&email=' + model.email ;
            else
                url = url + '/customerEdit' + '?id=' + model.id + '&name=' + model.name + '&street=' + model.street + '&pobox=' + model.zip + '&city=' + model.city + '&phone=' + model.phone + '&email=' + model.email ;
            $.ajax({
                type: "POST",
                url: CustomerEdit + '?id=' + model.id + '&name=' + model.name + '&street=' + model.street + '&pobox=' + model.zip + '&city=' + model.city + '&phone=' + model.phone + '&email=' + model.email,
                cache: false,
                success: function (data, statusText, xhr) {                     
                    alert("Customer details saved Successfully");                    
                },error: function (xhr, ajaxOptions, thrownError) { //Add these parameters to display the required response
                     alert("Unable to update customer details");
                 }
            });            
        } 
    });
});