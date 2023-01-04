function authenticate(creds) {
  const [username, password] = Buffer.from(
    creds.replace("Basic ", ""),
    "base64"
  )
    .toString()
    .split(":");

  if (!(username === "ben" && password === "pass-word")) {
    return false;
  } else {
    return true;
  }
}

module.exports = { authenticate };
