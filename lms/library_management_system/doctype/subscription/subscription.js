// Copyright (c) 2024, opticode and contributors
// For license information, please see license.txt

frappe.ui.form.on("Subscription", {
	refresh(frm) {
		setAmount(frm);
	},
	membership_type: function (frm) {
		setAmount(frm);
	},
	billing_cycle: function (frm) {
		setAmount(frm);
	},
	after_save: async function(frm){
		frappe.db.count('Members', { filters: { email: frm.doc.email }})
    .then(count => {
        if(count === 0){
			frappe.set_route('Form','Members','new')
		}
    })
	}
});

function setAmount(frm) {
	if (frm.doc.membership_type === "Standard") {
		if (frm.doc.billing_cycle === "Annually") {
			frm.set_value("amount", 2500);
		} else {
			frm.set_value("amount", 250);
		}
	} else {
		if (frm.doc.billing_cycle === "Annually") {
			frm.set_value("amount", 5500);
		} else {
			frm.set_value("amount", 500);
		}
	}
}
