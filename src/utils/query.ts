export const checkinfos = 'SELECT * FROM "user" WHERE email = $1 or cpf = $2'
export const getCities = 'SELECT * FROM "city" WHERE state_id = $1;'
export const userByIdQuery = 'SELECT * FROM "user" WHERE id = $1;'
export const getAddressesbyId = 'SELECT * FROM "address" WHERE user_id = $1;'
