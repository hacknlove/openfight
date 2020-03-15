export default function HasRole ({ userRoles, allowedRoles, children }) {
  if (!allowedRoles || allowedRoles.lenth === 0) {
    return children
  }

  if (userRoles.find(r => allowedRoles.has(r))) {
    return children
  }
  return null
}
