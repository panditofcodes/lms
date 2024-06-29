// Copyright (c) 2024, opticode and contributors
// For license information, please see license.txt

frappe.ui.form.on("Items", {
	refresh(frm) {
		$(
			'div[data-fieldname="books"],div[data-fieldname="section_break_zklo"],div[data-fieldname="section_break_dav3"'
		).css({
			border: "none",
		});
	},
});
