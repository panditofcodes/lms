import frappe 

@frappe.whitelist(allow_guest=True)
def get_members(user_mail):
    user_doc = frappe.db.sql("""
                             SELECT * FROM `tabMembers` WHERE email = %s
                             """, (user_mail,), as_dict=True)
    
    return user_doc

@frappe.whitelist(allow_guest = True)
def allot_credit(user_name):
    frappe.db.set_value('Members',)