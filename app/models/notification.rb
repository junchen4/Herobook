class Notification < ActiveRecord::Base
	validates :class_name, presence: true

end