json.array!(@comments) do |comment|
  json.extract! comment, :id, :post_id, :name, :email, :body
  json.url comment_url(comment, format: :json)
end
