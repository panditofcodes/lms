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

		// let date = new Date()
		// const day = date.getDate()
		// if(day === 1){
		// 	if(frm.doc.membership === "Standard"){

		// 	}
		// }

	},
	before_save: function(frm){
		if(frm.doc.membership === "Standard"){
			frm.set_value('book_credit',3)
			frm.set_value('magazine_credit',1)
		} else{
			frm.set_value('book_credit',10)
			frm.set_value('magazine_credit',1500)
		}
	},

	membership: function (frm) {
		if (frm.doc.membership === "Standard") {
			frm.set_value("books_can_be_allotted", 3);
			frm.set_value("magzines_can_be_allotted", 1);
			frm.set_value("allowed_books", 1);
			frm.set_value("allowed_magazine", 1);
		} else {
			frm.set_value("books_can_be_allotted", 10);
			frm.set_value("magzines_can_be_allotted", 1500);
			frm.set_value("allowed_books", 3);
			frm.set_value("allowed_magazine", 1500);
		}
	},
});
