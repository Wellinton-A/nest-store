export const checkinfos = 'SELECT * FROM "user" WHERE email = $1 or cpf = $2'
export const getCities = 'SELECT * FROM "city" WHERE state_id = $1;'
