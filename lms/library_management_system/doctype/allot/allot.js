// Copyright (c) 2024, opticode and contributors
// For license information, please see license.txt

frappe.ui.form.on("Allot", {
	refresh(frm) {
		$('div[data-fieldname="book_information"],div[data-fieldname="member_information"]').css({
			border: "none",
		});
	},
});
