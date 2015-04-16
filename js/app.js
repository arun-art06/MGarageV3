define([
    'kendo',
    './app/Garage/GarageViewModel',
    './app/Customer/CustomerViewModel',
    './app/Orders/OrdersViewModel',
], function (kendo, garageViewModel, customerViewModel, ordersViewModel) {
    var os = kendo.support.mobileOS;
    var statusBarStyle = os.ios && os.flatVersion >= 700 ? "black-translucent" : "black";
    //var customerList = [];
    return {
        kendoApp : null,
        garageService : {
            viewModel: null
        },
        customerService: {
            viewModel: null
        },
        ordersService: {
            viewModel: null
        },
        init: function () {
            this.kendoApp = new kendo.mobile.Application(document.body, { layout: "layout", statusBarStyle: statusBarStyle });            
        },
        loadCustomer: function (e) {
                app.customerService.viewModel = new customerViewModel(e.view.element.find("#customer_list_ul"));     
                kendo.bind($("#customer_list"), app.customerService.viewModel);  
        },
        loadInGarage: function (e) {
            app.garageService.viewModel = new garageViewModel($("#garage"));
        },
        loadOrder: function (e) {
            this.ordersService.viewModel = new ordersViewModel($("#order"));
            kendo.bind($("#ordersView"), this.ordersService.viewModel);
        } , 
        log_click:function(e) {            
             var form = $(e.button).closest('#login');
             var usr_name =  $(form ).find("#usr_name");
             var usr_password =  $(form ).find("#usr_password");
             $.ajax({
                 url: baseUrl+"/login?user="+$(usr_name).val()+"&pass="+$(usr_password).val(),
                 type: "POST", //This is what you should chage                  
                 success: function (data) {  
                     Global.user_id = data[0].id ;
                     Global.user_name = data[0].login ; 
                     //debugger;
                     window.app.kendoApp.navigate('#customer_list','slide:right');                     
                 },
                 error: function (xhr, ajaxOptions, thrownError) { //Add these parameters to display the required response
                     Global.user_id = -1 ;
                     Global.user_name = "";
                     alert("Authentication failure");
                 },
             });
            //alert(this.element.prop("id") + " was clicked!");
        }
    };
});