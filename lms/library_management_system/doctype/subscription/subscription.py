# Copyright (c) 2024, opticode and contributors
# For license information, please see license.txt

# import frappe
from frappe.model.document import Document
from datetime import datetime


class Subscription(Document):
	
	def before_save(self):
		date = datetime.today().date()
		self.billing_date = date

		if self.billing_cycle == "Monthly":
			if date.month == 12:
				self.valid_upto = date.replace(year=date.year + 1, month=1)
			else:
				self.valid_upto = date.replace(month=date.month + 1)
		else:
			self.valid_upto = date.replace(year=date.year + 1)
