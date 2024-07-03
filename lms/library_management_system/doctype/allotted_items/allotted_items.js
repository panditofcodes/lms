// Copyright (c) 2024, opticode and contributors
// For license information, please see license.txt

frappe.ui.form.on("Allotted Items", {
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
		await frappe.db.set_value("Items", frm.doc.item_name, "item_status", "Allotted");

		if (frm.doc.item_type === "Book") {
			let havingBooks;
			let allottedBooks;

			await frappe.db
				.get_value("Members", frm.doc.member, [
					"allotted_books",
					"having_books",
					"book_credit",
				])
				.then((res) => {
					havingBooks = res.message.having_books;
					allottedBooks = res.message.allotted_books;
					bookCredit = res.message.book_credit;
				});

			await frappe.db.set_value(
				"Members",
				frm.doc.member,
				"having_books",
				`${havingBooks + 1}`
			);

			await frappe.db
				.set_value("Members", frm.doc.member, "allotted_books", `${allottedBooks + 1}`)
				.then((res) => {
					console.log(res);
				});

			await frappe.db.set_value(
				"Members",
				frm.doc.member,
				"book_credit",
				`${bookCredit - 1}`
			);
		} else {
			let havingMagazine;
			let allottedMagazine;

			await frappe.db
				.get_value("Members", frm.doc.member, "having_magazine", "magazine_credit")
				.then((res) => {
					havingMagazine = res.message.having_magazine;
					magazineCredit = res.message.magazine_credit;
				});

			await frappe.db.set_value(
				"Members",
				frm.doc.member,
				"having_magazine",
				`${havingMagazine + 1}`
			);
			await frappe.db.set_value(
				"Members",
				frm.doc.member,
				"allotted_magazine",
				`${allottedMagazine + 1}`
			);
			await frappe.db.set_value(
				"Members",
				frm.doc.member,
				"magazine_credit",
				`${magazineCredit - 1}`
			);
		}

		frm.set_value("create_btn",1)
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
