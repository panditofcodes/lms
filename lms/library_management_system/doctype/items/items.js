// Copyright (c) 2024, opticode and contributors
// For license information, please see license.txt

frappe.ui.form.on("Items", {
	async refresh(frm) {
		let allotItem = false;
		let userDetails;
		let userMail = frappe.session.user_email;

		$(
			'div[data-fieldname="books"],div[data-fieldname="section_break_zklo"],div[data-fieldname="section_break_dav3"]'
		).css({
			border: "none",
		});

		if (frm.doc.create_btn) {
			try {
				let res = await frappe.call({
					method: "lms.library_management_system.api.get_members",
					args: {
						user_mail: userMail,
					},
				});

				if (res.message) {
					userDetails = res.message[0];

					console.log(userDetails);

					if (frm.doc.item_status === "Available") {
						frm.add_custom_button(`Get ${frm.doc.item_type}`, () => {
							getItem(frm, userDetails, allotItem);
						});
					} else {
						frm.add_custom_button(`Request ${frm.doc.item_type}`, () => {
							currentUser = frappe.session.user;
							joinWaitList(currentUser);
						});
					}
				} else {
					frappe.msgprint("No user details found.");
				}
			} catch (error) {
				console.error("Error fetching user details: ", error);
				frappe.msgprint("Unable to fetch user details. Please try again later.");
			}
		}
	},

	before_save: function (frm) {
		if (frm.doc.item_type === "Select") {
			validated = false;
			frappe.msgprint("Please select item type");
		}
	},
});

function getItem(frm, userDetails, allotItem) {
	if (!userDetails) {
		return frappe.show_alert(
			{
				message: __("Unable to get user details!"),
				indicator: "red",
			},
			5
		);
	}
	if (frm.doc.item_type === "Book") {
		if (userDetails.book_credit === 0) {
			return frappe.msgprint(
				"You do not have credits.Upgrade your plan or wait for next month."
			);
		} else {
			if (userDetails.rented_books >= userDetails.book_limit) {
				return frappe.msgprint(
					"You do not have credits.Upgrade your plan or wait for next month."
				);
			}
			allotItem = true;
		}
	} else {
		if (userDetails.magazine_credit === 0) {
			return frappe.msgprint(
				"You do not have credits.Upgrade your plan or wait for next month."
			);
		} else {
			if (userDetails.rented_magazines >= userDetails.magazine_limit) {
				return frappe.msgprint(
					"You do not have credits.Upgrade your plan or wait for next month."
				);
			}
			allotItem = true;
		}
	}

	if (allotItem) {
		let new_doc = frappe.model.get_new_doc("Rented Items");
		new_doc.item_name = frm.doc.name;
		new_doc.member = userDetails.name;
		frappe.set_route("Form", "Rented Items", new_doc.name);
	}
}

function joinWaitList(currentUser) {
	frappe.prompt(
		[
			{
				label: "Item",
				fieldname: "item_id",
				fieldtype: "Link",
				options: "Items",
				reqd: 1,
			},
			{
				label: "Member ID",
				fieldname: "member_id",
				fieldtype: "Link",
				options: "Members",
				reqd: 1,
			},
		],
		(values) => {
			frappe.call({
				method: "lms.library_management_system.api.join_waitlist",
				type: "POST",
				args: values,
				callback: function (response) {
					if (response.message) {
						frappe.msgprint(response.message);
					} else {
						frappe.msgprint("Failed to join waitlist.");
					}
				},
			});
		},
		"Enter Item and Member Details"
	);
}
