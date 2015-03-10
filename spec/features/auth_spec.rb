require 'rails_helper'

feature "Sign up" do
  before :each do
    visit "users/new"
  end

  it "has a user sign up page" do
    expect(page.to have_content "Sign Up")
  end

  it "takes an Email and Password" do
    expect(page.to have_content "Email")
    expect(page.to have_content "Password")
  end

  it "validates the presence of the user's email" do
    click_button "Sign Up"
    expect(page.to have_content "Sign Up")
    expect(page.to have_content "Email can't be blank")
  end

  it "rejects blank (zero-length) passwords" do
    click_button "Sign Up"
    expect(page.to have_content "Sign Up")
    expect(page.to have_content "Password is too short")
  end

  it "validates that the user's email is at least 6 characters long" do
    fill_in "Password", with: "pw"
    click_button "Sign Up"
    expect(page.to have_content "Sign Up")
    expect(page.to have_content "Password is too short")
  end

  it "logs the user in and redirects to the user's show (profile) page" do
    fill_in "Email", with: "hobo_bill@allday.com"
    fill_in "Password", with: "password"
    click_button "Sign Up"
    expect(page.to have_content "hobo_bill@allday.com")
  end
end

feature "Logout" do
  before :each do
    sign_up("kingkong@apes.com")
  end

  it "has a logout button" do
    expect(page.to have_content "Logout")
  end

  it "does not allow a user to a show page after logging out" do
    click_link "Logout"
    expect(page.to have_content "Login")

    visit "users/1"
    expect(page.to have_content "Login")
  end

end
