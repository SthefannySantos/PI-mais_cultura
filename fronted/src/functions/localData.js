export function verifyUserData(){
    const valid = localStorage.id && localStorage.nome && localStorage.email && localStorage.acesso ? true : false;
    return valid;
}

export function levelAccessRedirect(){
    const url = localStorage.acesso == 2 ? '/admin/home' : '/' ;
    return url;
}


export function EventDateFormated(dateEvent) {
    return new Date(dateEvent).toLocaleDateString('pt-BR', {
        day: '2-digit', month: 'long', year:'numeric'
    });
} 

export function EventHourFormated(dateEvent) {
    return new Date(dateEvent).toLocaleTimeString('pt-BR', {
        hour: '2-digit', minute: '2-digit'
    });
}

export function toDateTimeLocal(iso) {
  if (!iso) return '';
  const dateObj = new Date(iso);
  const offset = dateObj.getTimezoneOffset() * 60000; // compensar timezone
  const localISOTime = new Date(dateObj - offset).toISOString().slice(0,16);
  return localISOTime;
};

export function toDate(iso) { return iso ? iso.split('T')[0] : '' };

export function participateDisabled(event) {
    const total = Number(event?.total_inscritos || 0);
    const limite = Number(event?.limite_participantes || 0);
    const deadline = new Date(event?.fim_inscricao);

    if (total >= limite) return true;

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    deadline.setHours(0, 0, 0, 0);

    console.log(today > deadline)
    return today > deadline;
};


export function formatPhone(number) {
  const digits = number.replace(/\D/g, '');

  // Output: (XX) XXXXX-XXXX
  const match = digits.match(/^(\d{2})(\d{5})(\d{4})$/);

  if (match) { return `(${match[1]}) ${match[2]}-${match[3]}`;}

  return digits;
}