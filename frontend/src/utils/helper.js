const removeDuplicate = (transactions) => {
  for (let i = 0; i < transactions.length; i++) {
    for (let j = i + 1; j < transactions.length; j++) {
      if (transactions[j].category === transactions[i].category) {
        transactions[i] = {
          ...transactions[i],
          amount: transactions[i].amount + transactions[j].amount,
        };
        transactions.splice(j, 1);
      }
    }
  }
  return transactions;
};

const formatDate = (date) => {
  let userDate = new Date(date);
  // get the date from user date
  let formatedDate = new Date(userDate.getTime());

  // get the current date
  let currentDate = new Date();

  formatedDate.setHours(currentDate.getHours());
  formatedDate.setMinutes(currentDate.getMinutes());
  formatedDate.setSeconds(currentDate.getSeconds());

  return formatedDate.toISOString();
};

const capitalizeName = (name) => {
  let fullName = name.split(' ');
  let firstName = fullName[0].charAt(0).toUpperCase() + fullName[0].slice(1);
  let lastName = fullName[1].charAt(0).toUpperCase() + fullName[1].slice(1);
  return firstName + ' ' + lastName;
};

const helper = {
  removeDuplicate,
  formatDate,
  capitalizeName,
};
export default helper;
