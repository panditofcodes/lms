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

# function to join wait list  
@frappe.whitelist(allow_guest = True) 
def join_waitlist(values):
    item_id = values.iteme_id
    member_id = values.member_id
    try:
       
        if not item_id or not member_id:
            frappe.throw("Insufficient Data!")

        
        item = frappe.get_doc('Item', item_id)

       
        wait_list = frappe.new_doc('Wait List')
        wait_list.item = item_id
        wait_list.member = member_id

        
        wait_list.insert()

        
        frappe.msgprint("Wait List Updated!")

    except frappe.DoesNotExistError:
        frappe.throw(f"Item {item_id} or Memeber {member_id} does not exist.")

    except Exception as e:
        frappe.throw(f"Error: {str(e)}")