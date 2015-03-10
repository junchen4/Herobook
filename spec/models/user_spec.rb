require 'rails_helper'

RSpec.describe User, :type => :model do
  describe "password encryption" do
    it "does not save passwords to the database" do
      User.create!(email: "peter_griffin@domain.com", password: "password")
      user = User.find_by_email("peter_griffin@domain.com")
      expect(user.password).not_to be("password")
    end

    it "encrypts the password using BCrypt" do
      expect(BCrypt::Password).to receive(:create)
      User.new(email: "peter_griffin@domain.com", password: "password")
    end
  end
end
