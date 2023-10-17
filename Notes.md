# Entities
1. **Products:**✅
   - Attributes:
     - Product ID
     - Product Name
     - Description
     - Price
     - Stock Quantity
     - Image
   - Relationships:
     - Belongs to a Category
     - Belongs to a Brand
     - Ordered by Customers
     - Reviewed by Users

2. **Categories:**✅
   - Attributes:
     - Category ID
     - Category Name
     - Description
   - Relationships:
     - Contains Products
     - Subcategory of another Category (if applicable)

3. **Brands:**✅
   - Attributes:
     - Brand ID
     - Brand Name
     - Description
   - Relationships:
     - Produces Products

4. **Users:** ✅
   - Attributes:
     - User ID
     - Username
     - Email
     - Password
     - First Name
     - Last Name
     - Address
     - Phone Number
   - Relationships:
     - Places Orders
     - Writes Reviews

5. **Customers:**
   - Attributes:
     - Customer ID
     - User ID (linked to a User)
     - Registration Date
     - Loyalty Points
   - Relationships:
     - Places Orders
     - Provides Feedback (through reviews and ratings)

