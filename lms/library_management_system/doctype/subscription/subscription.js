// Copyright (c) 2024, opticode and contributors
// For license information, please see license.txt

frappe.ui.form.on("subscription", {
	refresh(frm) {
		setValues(frm);
	},

	members_type: function (frm) {
		if (frm.doc.billing_cycle === "") {
			return;
		}
		setValues(frm);
	},

	billing_cycle: function (frm) {
		setValues(frm);
	},
});

function setValues(frm) {
	if (frm.doc.members_type === "Standard") {
		if (frm.doc.billing_cycle === "Monthly") {
			frm.set_value("amount", 250);
		} else {
			frm.set_value("amount", 2500);
		}
	} else {
		if (frm.doc.billing_cycle === "Monthly") {
			frm.set_value("amount", 500);
		} else {
			frm.set_value("amount", 5500);
		}
	}
}
