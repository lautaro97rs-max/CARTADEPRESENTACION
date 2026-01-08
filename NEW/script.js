document.addEventListener('DOMContentLoaded', function () {
  const btn = document.getElementById('submitBtn');
  const pwd = document.getElementById('password');
  const pwdConfirm = document.getElementById('confirmPassword');
  const gen = document.getElementById('generateBtn');

  btn.addEventListener('click', validateForm);
  if (pwd) pwd.addEventListener('input', updateStrength);
  if (pwd) pwd.addEventListener('input', clearMessageOnEdit);
  if (pwdConfirm) pwdConfirm.addEventListener('input', clearMessageOnEdit);
  if (gen) gen.addEventListener('click', function () {
    const newPwd = generatePassword(12);
    if (pwd) pwd.value = newPwd;
    if (pwdConfirm) pwdConfirm.value = newPwd;
    updateStrength();
    try { navigator.clipboard.writeText(newPwd); } catch (e) {}
    showMessage('Contraseña generada y copiada al portapapeles.', 'success');
  });
});

function validateForm() {
  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const ageValue = document.getElementById('age').value.trim();
  const password = document.getElementById('password') ? document.getElementById('password').value : '';
  const confirmPassword = document.getElementById('confirmPassword') ? document.getElementById('confirmPassword').value : '';
  const messageArea = document.getElementById('message');

  const errors = [];

  if (!name) {
    errors.push('El nombre es obligatorio.');
  }

  if (!email) {
    errors.push('El correo es obligatorio.');
  } else if (!isValidEmail(email)) {
    errors.push('El correo no tiene un formato válido.');
  }

  if (!ageValue) {
    errors.push('La edad es obligatoria.');
  } else {
    const age = parseInt(ageValue, 10);
    if (Number.isNaN(age)) {
      errors.push('La edad debe ser un número.');
    } else if (age < 18) {
      errors.push('Debes ser mayor de 18 años.');
    }
  }

  if (errors.length > 0) {
    showMessage(errors.join('<br>'), 'error');
  } else {
    // Validar contraseña
    const pwdCheck = checkPassword(password);
    if (!pwdCheck.ok) {
      showMessage('La contraseña no cumple los requisitos:<br>' + pwdCheck.reasons.join('<br>'), 'error');
      return;
    }
    if (password !== confirmPassword) {
      showMessage('La contraseña y su confirmación no coinciden.', 'error');
      return;
    }

    showMessage('Registro correcto. Los datos y la contraseña son válidos.', 'success');
    // Aquí podrías enviar los datos a un servidor si fuese necesario.
  }
}

function isValidEmail(email) {
  // Comprobación sencilla de formato de correo
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

function showMessage(html, type) {
  const area = document.getElementById('message');
  area.innerHTML = html;
  if (type === 'error') {
    area.style.backgroundColor = '#ffe6e6';
    area.style.color = '#900';
    area.style.border = '1px solid #f5c2c2';
  } else {
    area.style.backgroundColor = '#e6ffea';
    area.style.color = '#060';
    area.style.border = '1px solid #b7f0c6';
  }
}

function clearMessageOnEdit() {
  const area = document.getElementById('message');
  if (area) area.innerHTML = '';
}

function updateStrength() {
  const pwd = document.getElementById('password').value || '';
  const result = checkPassword(pwd);
  const strengthBar = document.getElementById('strengthBar');
  const strengthText = document.getElementById('strengthText');

  let score = 0;
  if (result.length) score++;
  if (result.uppercase) score++;
  if (result.lowercase) score++;
  if (result.digit) score++;
  if (result.special) score++;

  if (strengthBar) {
    strengthBar.style.width = (score / 5 * 100) + '%';
    if (score <= 2) strengthBar.style.background = '#e74c3c';
    else if (score === 3) strengthBar.style.background = '#f39c12';
    else strengthBar.style.background = '#2ecc71';
  }
  if (strengthText) {
    const labels = ['Muy débil','Débil','Moderada','Fuerte','Muy fuerte'];
    strengthText.textContent = labels[Math.max(0, Math.min(4, score-1))];
  }

  // Update criteria list UI
  const items = document.querySelectorAll('#criteriaList li');
  items.forEach(li => {
    const crit = li.getAttribute('data-criteria');
    if (result[crit]) {
      li.style.color = '#0a0';
      li.style.textDecoration = 'line-through';
    } else {
      li.style.color = '';
      li.style.textDecoration = 'none';
    }
  });
}

function checkPassword(pwd) {
  const out = {
    length: pwd.length >= 8,
    uppercase: /[A-Z]/.test(pwd),
    lowercase: /[a-z]/.test(pwd),
    digit: /[0-9]/.test(pwd),
    special: /[!@#$%^&*(),.?"':{}|<>\[\]\\/\\;_+=-]/.test(pwd)
  };
  out.ok = out.length && out.uppercase && out.lowercase && out.digit && out.special;
  out.reasons = [];
  if (!out.length) out.reasons.push('Al menos 8 caracteres');
  if (!out.uppercase) out.reasons.push('Al menos una letra mayúscula');
  if (!out.lowercase) out.reasons.push('Al menos una letra minúscula');
  if (!out.digit) out.reasons.push('Al menos un número');
  if (!out.special) out.reasons.push('Al menos un símbolo especial');
  return out;
}

function generatePassword(length = 12) {
  const upper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const lower = 'abcdefghijklmnopqrstuvwxyz';
  const digits = '0123456789';
  const special = '!@#$%^&*()-_=+[]{};:,.<>/?';
  const all = upper + lower + digits + special;
  let pw = '';
  pw += upper[Math.floor(Math.random() * upper.length)];
  pw += lower[Math.floor(Math.random() * lower.length)];
  pw += digits[Math.floor(Math.random() * digits.length)];
  pw += special[Math.floor(Math.random() * special.length)];
  for (let i = 4; i < length; i++) {
    pw += all[Math.floor(Math.random() * all.length)];
  }
  return pw.split('').sort(() => Math.random() - 0.5).join('');
}
