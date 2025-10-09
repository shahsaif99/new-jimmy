import { Ability } from '@casl/ability'
import { initialAbility } from './config'

//  Read ability from localStorage
// * Handles auto fetching previous abilities if already logged in user
// ? You can update this if you store user abilities to more secure place
// ! Anyone can update localStorage so be careful and please update this
const abilities = JSON.parse(localStorage.getItem('abilities'))
const existingAbility = abilities || null

export default new Ability([
  {
    subject: 'all',
    action: existingAbility,
  },
])


// export default function defineAbilityFor(userRole) {
//     const { can, cannot, build } = new AbilityBuilder(Ability)

//     console.log(userRole);
//     if (userRole === 'user') {
//       can('read', 'Institution')
//       cannot(['create', 'update'], 'all')
//     }

//     if (userRole === 'admin') {
//       can('manage', 'all')
//     }

//     return build()
//   }

