export const OWNER = 'OWNER'
export const ADMIN = 'ADMIN'
export const CURATOR = 'CURATOR'
export const USER = 'USER'

export const availableRoles = [OWNER, ADMIN, CURATOR, USER]

export const createUserRole = async (root, args, context, info) =>
  await context.db.mutation.createUserRole({
    data: {
      user: {
        connect: {
          id: args.userId
        }
      },
      role: {
        connect: {
          id: args.roleId
        }
      }
    }
  }, info)

export const findRoleIdByName = async (context, roleName) => {
  const roles = await context.db.query.roles({
    where: {
      name: roleName
    }
  }, `{ id }`)
  return roles[0].id
}

export const findUserIdByEmail = async (context, userEmail) => {
  const users = await context.db.query.users({
    where: {
      email: userEmail
    }
  }, `{ id }`)
  return users[0].id
}

export const userRoleExists = async (context, args) =>
  await context.db.exists.UserRole({
    user: {
      id: args.userId
    },
    role: {
      id: args.roleId
    }
  })
