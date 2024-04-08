/**
 * eslint-disable @sap/ui5-jsdocs/no-jsdoc
 */

sap.ui.define([
        "sap/ui/core/UIComponent",
        "sap/ui/Device",
        "dashboard/model/models"
    ],
    function (UIComponent, Device, models) {
        "use strict";

        return UIComponent.extend("dashboard.Component", {
            metadata: {
                manifest: "json"
            },

            /**
             * The component is initialized by UI5 automatically during the startup of the app and calls the init method once.
             * @public
             * @override
             */
            init: function () {
                // call the base component's init function
                UIComponent.prototype.init.apply(this, arguments);

                // enable routing
                this.getRouter().initialize();

                // set the device model
                this.setModel(models.createDeviceModel(), "device");
                this.setModel(models.createAppInfoModel(), "dashboard")
                this._getLoggedInUserInfo();

            },


            _getLoggedInUserInfo: function() {
                var oModel = this.getModel(); 
                var functionPath = "/LoggedInUser";
            
                oModel.read(functionPath, {
                    success: function(odata) {
                        if (odata.role === "HR") {
                            this.getModel("dashboard").setProperty("/role", "HR");
                        }
                        if (odata.role === "Employee") {
                            this.getModel("dashboard").setProperty("/role", "Employee");
                        }
                    }.bind(this),
                    error: function(oError) {
                        console.log("============================");
                        console.log(oError);
                    }
                });
            }

          
            
        });
    }
);



//new branch created
