sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageBox"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller,MessageBox) {
        "use strict";

        return Controller.extend("nwc.controller.View1", {
            onInit: function () {
              var that=this;
                this.oModel=this.getOwnerComponent().getModel();
                this.oModel.read("/Customers", {
                    success: function(odata) { 
                      var oJson=new  sap.ui.model.json.JSONModel({tabdata:odata.results})
                      that.getView().byId("ID_CUST").setModel(oJson);
                     },
                    error: function(oError) { 
                        
                    }
                  });
            },

            onDelete:function(){
                this.oModel.setUseBatch(false);
                this.oModel.remove("/Customers('"+this.sCustId+"')", {
                    success: function(data) {
                     alert("success");
                    },
                    error: function(e) {
                     alert("error");
                    }
                   });
            },

            onAdd:function(oEve){
                var postData={CustomerID:"ABCDE",City:"Banglore",Country:"India"};
                this.oModel.setUseBatch(false);
                this.oModel.create("/Customers", postData, null, function (response) {
                    MessageBox.success("Successfully created");
                }, function (Error) {
                        MessageBox.show("Customer Creation Failed  " + oCust1);
                    });
            },

            onEdit:function(){
                var payload={City:"Banglore",Country:"India"};
                this.oModel.setUseBatch(false);
                this.oModel.update("/Customers('"+this.sCustId+"')",payload,{
                    success: function(data,response){
                        MessageBox.success("Successfully Updated");
                    },
                    error: function(error){
                        MessageBox.error("Error while updating the data");
                    }
                });
            },

            onselect:function(oEve){
                this.sCustId=oEve.getParameters().listItems[0].getBindingContext().getObject().CustomerID
            }

        });
    });
