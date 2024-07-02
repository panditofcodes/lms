import frappe
import datetime

def allot_credit():
    date = datetime.datetime.now()
    day = date.strftime("%d")

    if day == '01':  
        frappe.db.sql("""
            UPDATE `tabMembers`
            SET book_credit = 3, magazine_credit = 1
            WHERE membership = 'Standard'
        """)

        frappe.db.sql("""
            UPDATE `tabMembers`
            SET book_credit = 10, magazine_credit = 1500
            WHERE membership = 'Premium'
        """)

        frappe.db.commit()


allot_credit()
