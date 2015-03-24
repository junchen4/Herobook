json.extract! @request, :id, :requestor_id, :requestee_id, :status, :created_at, :updated_at
json.requestor @request.find_requestor, :email
json.requestee @request.find_requestee, :email
