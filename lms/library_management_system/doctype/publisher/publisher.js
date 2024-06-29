// Copyright (c) 2024, opticode and contributors
// For license information, please see license.txt

frappe.ui.form.on("Publisher", {
	refresh(frm) {
        $('div[data-fieldname="photo"]').css({
			height:"150px",
            width: "150px"
		});
	},
});
