const QUESTIONS = [["departamento", "¿En qué departamento de Mendoza desarrollás tu actividad?", ["Capital", "Godoy Cruz", "Guaymallén", "Las Heras", "Luján de Cuyo", "Maipú", "Lavalle", "San Martín", "Junín", "Rivadavia", "Santa Rosa", "La Paz", "Tunuyán", "Tupungato", "San Carlos", "San Rafael", "General Alvear", "Malargüe", "Fuera de Mendoza"], true], ["edad", "¿En qué rango de edad estás?", ["Menos de 18", "18 a 24", "25 a 34", "35 a 44", "45 a 54", "55 o más", "Prefiero no responder"], false], ["genero", "¿Cómo describís tu género?", null, false], ["tareas", "¿Qué tareas realizás o realizaste en el mundo del café?", null, true], ["vinculo", "¿Cuál es tu vínculo actual con el café?", ["Trabajo en relación de dependencia", "Trabajo por mi cuenta", "Combino ambas modalidades", "Busco trabajo en el sector", "Estoy en formación", "Trabajé antes en el sector", "Otro"], true], ["experiencia", "¿Cuánto tiempo de experiencia tenés en el sector?", ["Todavía no trabajé en el sector", "Menos de 1 año", "1 a 3 años", "4 a 6 años", "7 años o más"], true], ["formacion", "¿Cómo aprendiste lo que sabés de café?", null, true], ["necesidades", "¿Qué te gustaría aprender o profundizar para seguir desarrollándote en el mundo del café?", null, false], ["barreras", "¿Qué te dificulta acceder a formación o seguir desarrollándote?", null, false], ["oportunidades", "¿Sentís que tenés las mismas oportunidades de desarrollo que otras personas del sector?", ["Sí", "En parte", "No", "No sé", "Prefiero no responder"], false], ["mejoras", "¿Qué cambios ayudarían a mejorar tu experiencia de trabajo en el café?", null, false], ["historia", "¿Hay algo de tu recorrido que te gustaría compartir?", null, false]];
const EXTRA = ['email','resultados','entrevistas','consentimiento'];
function setup() {
  const props = PropertiesService.getScriptProperties();
  if (props.getProperty('SHEET_ID')) return;
  const ss = SpreadsheetApp.create('Detrás de cada taza — Respuestas');
  const sh = ss.getSheets()[0]; sh.setName('Respuestas');
  sh.appendRow(['Fecha','ID',...QUESTIONS.map(q=>q[0]),...EXTRA,'Version']);
  sh.setFrozenRows(1);
  props.setProperty('SHEET_ID', ss.getId());
  console.log(ss.getUrl());
}
function doGet(){ return page_('Detrás de cada taza','Este es el receptor del relevamiento de Alquimistas del Café. Completá el formulario desde la página del proyecto.'); }
function doPost(e) {
  let lock;
  try {
    if (!e || !e.parameter || e.postData.length > 30000) throw Error('Envío no válido.');
    const p=e.parameter;
    if(p.website || p.consentimiento!=='si') throw Error('Revisá el consentimiento y volvé a enviar.');
    if(!/^[0-9a-f-]{36}$/i.test(p.submission_id||'')) throw Error('Identificador no válido. Volvé a abrir el formulario.');
    QUESTIONS.forEach(([key,label,options,required])=>{
      const v=p[key]||'';
      if(required&&!v.trim()) throw Error('Falta completar: '+label);
      if(v.length>1200 || (v && options && !options.includes(v))) throw Error('Respuesta no válida: '+label);
    });
    if((p.email||'').length>254 || (p.email&&!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(p.email))) throw Error('Revisá el correo electrónico.');
    ['resultados','entrevistas'].forEach(k=>{if(p[k] && p[k]!=='si') throw Error('Opción no válida.');});
    if((p.resultados||p.entrevistas)&&!p.email) throw Error('Falta tu correo para poder contactarte.');
    const id=PropertiesService.getScriptProperties().getProperty('SHEET_ID');
    if(!id) throw Error('El relevamiento todavía no está habilitado.');
    lock=LockService.getScriptLock();lock.waitLock(15000);
    const sh=SpreadsheetApp.openById(id).getSheetByName('Respuestas');
    const exists=sh.getLastRow()>1 && sh.getRange(2,2,sh.getLastRow()-1,1).createTextFinder(p.submission_id).matchEntireCell(true).findNext();
    if(!exists){
      const safe=v=>/^[=+@\-\t\r\n]/.test(v)?"'"+v:v;
      const values=[new Date(),p.submission_id,...QUESTIONS.map(q=>safe(p[q[0]]||'')),...EXTRA.map(k=>safe(p[k]||'')),'2026-10-v1'];
      sh.getRange(sh.getLastRow()+1,1,1,values.length).setValues([values]);
      SpreadsheetApp.flush();
    }
    return page_('¡Gracias por compartir tu recorrido!','Tu respuesta quedó guardada. Con tu participación seguimos conociendo a la comunidad cafetera de Mendoza. Ya podés cerrar esta página.');
  } catch(err) {
    return page_('No pudimos registrar tu respuesta','Volvé atrás para conservar tus respuestas y revisalas. '+(err.message||'Intentá nuevamente.'));
  } finally {if(lock&&lock.hasLock())lock.releaseLock();}
}
function page_(title,message){
 const escape=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 return HtmlService.createHtmlOutput('<!doctype html><html lang="es"><meta name="viewport" content="width=device-width,initial-scale=1"><title>'+escape(title)+'</title><body style="background:#f4eddf;color:#39281f;font:20px/1.5 Arial;padding:10%;max-width:700px"><p>ALQUIMISTAS DEL CAFÉ</p><h1>'+escape(title)+'</h1><p>'+escape(message)+'</p></body></html>');
}
