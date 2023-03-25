const jwt = require("jsonwebtoken")

userDetails = {
  1000: { username: "anu", acno: 1000, password: "abc123", balance: 0, transaction: [] },
  1001: { username: "amal", acno: 1001, password: "abc123", balance: 0, transaction: [] },
  1002: { username: "arun", acno: 1002, password: "abc123", balance: 0, transaction: [] },
  1003: { username: "megha", acno: 1003, password: "abc123", balance: 0, transaction: [] }
}



register = (acno, uname, psw) => {
  if (acno in userDetails) {
    return {
      status: false,
      message: "user already present",
      statusCode: 404
    }
  }
  else {
    userDetails[acno] = { username: uname, acno, password: psw, balance: 0, transaction: [] }
    return {
      status: true,
      message: "registered",
      statusCode: 200
    }
  }
}







login = (acno, psw) => {
  if (acno in userDetails) {
    if (psw == userDetails[acno]["password"]) {
      // store current user
      currentUser = userDetails[acno]["username"]
      currentAcno = acno

      // token create

      jwt.sign({acno},"superkey123")


      return {
        status: true,
        message: "registered",
        statusCode: 200,
        currentUser,
        currentAcno,
        token
      }
    }
    else {
      return {
        status: false,
        message: "incorrect password",
        statusCode: 404
      }
    }
  }
  else {
    return {
      status: false,
      message: "not registered yet",
      statusCode: 404
    }
  }
}





deposit = (acno, psw, amnt) => {
  // to convert string amnt to int
  var amount = parseInt(amnt)
  if (acno in userDetails) {
    if (psw == userDetails[acno]["password"]) {
      userDetails[acno]["balance"] += amount
      console.log(userDetails);
      // add transaction data
      userDetails[acno]["transaction"].push(
        {
          Type: "Credit",
          Amount: amount
        }
      )
      return {
        status: true,
        message: `your account has been credited with amount ${amount} and the balance is ${userDetails[acno]["balance"]}`,
        statusCode: 200,
      }

    }
    else {
      return {
        status: false,
        message: "incorrect password",
        statusCode: 404
      }
    }
  }
  else {
    return {
      status: false,
      message: "incorrect acno",
      statusCode: 404
    }
  }

}

withdraw = (acno, psw, amnt) => {
  // to convert string amnt to int
  var amount = parseInt(amnt)
  if (acno in userDetails) {
    if (psw == userDetails[acno]["password"]) {
      if (amount < userDetails[acno]["balance"]) {
        userDetails[acno]["balance"] -= amount
        console.log(userDetails);

        userDetails[acno]["transaction"].push(
          {
            Type: "Debit",
            Amount: amount
          }
        )
        // console.log(userDetails);

        return {
          status: true,
          message: `your account has been debited with amount ${amount} and the balance is ${userDetails[acno]["balance"]}`,
          statusCode: 200,
        }
      }
      else {
        return {
          status: false,
          message: "insufficient balance",
          statusCode: 404
        }
      }


    }
    else {
      return {
        status: false,
        message: "incorrect password",
        statusCode: 404
      }
    }
  }
  else {
    return {
      status: false,
      message: "incorrect acno",
      statusCode: 404
    }
  }

}

getTransaction = (acno) => {
  return {
    status: true,
    transaction: userDetails[acno].transaction,
    statusCode: 200
  }
}



module.exports = {
  register, login, deposit, withdraw, getTransaction
}
