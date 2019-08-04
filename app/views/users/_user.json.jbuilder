json.extract! user, :id, :email, :last_log, :user_type, :active, :comment, :created_at, :updated_at
json.url user_url(user, format: :json)
