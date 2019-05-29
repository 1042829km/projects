class User < ApplicationRecord
  has_many: messages
  has_many: groups, through: :group_user
end
