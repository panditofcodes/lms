// Copyright (c) 2024, opticode and contributors
// For license information, please see license.txt

frappe.ui.form.on("Members", {
	async refresh(frm) {
		$('div[data-fieldname="photo"]').css({
			height: "150px",
			width: "150px",
		});
		$('div[data-fieldname="personal_information"]').css({
			border: "none",
		});
	},
	// before_save: function(frm){
	// 	if(frm.doc.membership === "Standard"){
	// 		frm.set_value('book_credit',3)
	// 		frm.set_value('magazine_credit',1)
	// 	} else{
	// 		frm.set_value('book_credit',10)
	// 		frm.set_value('magazine_credit',1500)
	// 	}
	// },

	email: function (frm) {
		setValue(frm);
	},
});

function setValue(frm) {
	if (frm.doc.membership_type === "Standard") {
		frm.set_value("book_credit", 3);
		frm.set_value("book_limit", 1);
		frm.set_value("magzine_credit", 1);
		frm.set_value("magazine_limit", 1);
	} else {
		frm.set_value("book_credit", 10);
		frm.set_value("book_limit", 3);
		frm.set_value("magzine_credit", 1500);
		frm.set_value("magazine_limit", 1500);
	}
}

async function getSubscriptionDetail(frm) {
	userMail = frm.doc.email;
	await frappe.db.get_value("Subscription", { email: userMail }).then((r) => {
		console.log(r);
	});
}
