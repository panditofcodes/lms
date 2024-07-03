// Copyright (c) 2024, opticode and contributors
// For license information, please see license.txt

frappe.ui.form.on("Rented Items", {
	refresh(frm) {
		$('div[data-fieldname="book_information"],div[data-fieldname="member_information"]').css({
			border: "none",
		});

		if (frm.doc.create_btn) {
			frm.add_custom_button(`Return ${frm.doc.item_type}`, () => {
				returnItem(frm);
			});
		}
	},

	before_save: async function (frm) {
		if (frm.doc.item_type === "Book") {
			let bookCredit;
			let rentedBooks;

			await frappe.db
				.get_value("Members", frm.doc.member, ["book_credit", "rented_books"])
				.then((res) => {
					bookCredit = res.message.book_credit;
					rentedBooks = res.message.rented_books;
				});

			validate = false;
			await frappe.db.set_value(
				"Members",
				frm.doc.member,
				"rented_books",
				`${rentedBooks + 1}`
			);

			await frappe.db.set_value(
				"Members",
				frm.doc.member,
				"book_credit",
				`${bookCredit - 1}`
			);
		} else {
			let magazineCredit;
			let rentedMagazines;

			await frappe.db
				.get_value("Members", frm.doc.member, "rented_magazines", "magazine_credit")
				.then((res) => {
					rentedMagazines = res.message.rented_magazines;
					magazineCredit = res.message.magazine_credit;
				});

			await frappe.db.set_value(
				"Members",
				frm.doc.member,
				"rented_magazines",
				`${rentedMagazines + 1}`
			);

			await frappe.db.set_value(
				"Members",
				frm.doc.member,
				"magazine_credit",
				`${magazineCredit - 1}`
			);
		}
		await frappe.db.set_value("Items", frm.doc.item_name, "item_status", "Allotted");
		frm.set_value("create_btn", 1);
	},
});

async function returnItem(frm) {
	if (frm.doc.item_type === "Book") {
		let havingBooks;

		await frappe.db.get_value("Members", frm.doc.member, "having_books").then((res) => {
			havingBooks = res.message.having_books;
		});

		await frappe.db.set_value("Members", frm.doc.member, "having_books", `${havingBooks - 1}`);

		frappe.msgprint("Book Returned!");
	} else {
		let havingMagazine;

		await frappe.db.get_value("Members", frm.doc.member, "having_magazine").then((res) => {
			havingMagazine = res.message.having_magazine;
		});

		await frappe.db.set_value(
			"Members",
			frm.doc.member,
			"having_magazine",
			`${havingMagazine - 1}`
		);

		frapp.msgprint("Magazine Returned!");
	}

	await frappe.db.set_value("Items", frm.doc.item_name, "item_status", "Available");
}
