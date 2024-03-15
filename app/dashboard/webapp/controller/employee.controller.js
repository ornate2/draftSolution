sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/Fragment"
], function(Controller, Fragment) {
    "use strict";

    return Controller.extend("dashboard.controller.employee", {
        onApplyLeavePress: function() {
            if (!this._oLeaveDialog) {
                Fragment.load({
                    name: "dashboard.view.fragment.ApplyLeave",
                    controller: this
                }).then(function(oFragment) {
                    this._oLeaveDialog = oFragment;
                    this.getView().addDependent(this._oLeaveDialog);
                    this._oLeaveDialog.open();
                }.bind(this));
            } else {
                this._oLeaveDialog.open();
            }
        },

        onClose: function() {
            if (this._oLeaveDialog) {
                this._oLeaveDialog.close();
            }
        },

        onSubmit: function() {
            // Here you can handle the submit action
            // For example, you can collect the data from the fragment controls
            var oLeaveDialog = this._oLeaveDialog;
            var oSelect = oLeaveDialog.getContent()[0].getContent()[1];
            var oStartDatePicker = oLeaveDialog.getContent()[0].getContent()[3];
            var oEndDatePicker = oLeaveDialog.getContent()[0].getContent()[5];
            var oReasonTextArea = oLeaveDialog.getContent()[0].getContent()[7];

            var oSelectedLeave = oSelect.getSelectedItem();
            var sLeaveType = oSelectedLeave ? oSelectedLeave.getText() : "";
            var sStartDate = oStartDatePicker.getValue();
            var sEndDate = oEndDatePicker.getValue();
            var sReason = oReasonTextArea.getValue();

            // Here you can proceed to submit the data, e.g., sending it to the backend or performing any other action
            // For now, let's just log the data
            console.log("Leave Type:", sLeaveType);
            console.log("Start Date:", sStartDate);
            console.log("End Date:", sEndDate);
            console.log("Reason:", sReason);

            // Finally, close the dialog
            this.onClose();
        },
        onSubmit: function () {
            // Get the data from the fragment controls
            var oSelect = this.byId("leaveTypeSelect");
            var oStartDatePicker = this.byId("startDatePicker");
            var oEndDatePicker = this.byId("endDatePicker");
            var oReasonTextArea = this.byId("reasonTextArea");
        
            var sLeaveType = oSelect.getSelectedItem().getText();
            var sStartDate = oStartDatePicker.getValue();
            var sEndDate = oEndDatePicker.getValue();
            var sReason = oReasonTextArea.getValue();
        
            // Prepare the payload
            var oPayload = {
                LeaveType: sLeaveType,
                StartDate: sStartDate,
                EndDate: sEndDate,
                Reason: sReason
            };
        
            // Send the data to CAP service
            $.ajax({
                url: "/LeaveService/LeaveApplication",
                type: "POST",
                contentType: "application/json",
                data: JSON.stringify(oPayload),
                success: function () {
                    sap.m.MessageBox.success("Leave applied successfully and Pending for approval", {
                        title: "Success",
                        onClose: function () {
                            // Logic to execute after the message box is closed
                        }
                    });
        
                    // Close the dialog
                    if (this._oLeaveDialog) {
                        this._oLeaveDialog.close();
                    }
                }.bind(this),
                error: function (xhr, textStatus, errorThrown) {
                    sap.m.MessageBox.error("Error while applying leave: " + errorThrown);
                }
            });
        },
        
        onSubmit: function () {
            // Display a success message box
            sap.m.MessageBox.success("Leave applied successfully and Pending for approval", {
                title: "Success",
                onClose: function () {
                    // Logic to execute after the message box is closed
                }
            });
        
            // Close the dialog
            if (this._oLeaveDialog) {
                this._oLeaveDialog.close();
            }
        },
    });
});
