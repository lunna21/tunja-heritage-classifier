import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type FieldErrors } from "react-hook-form";
import { ESTADO_OPTIONS, PCI_OPTIONS, PERIOD_OPTIONS, TIPOLOGIA_OPTIONS } from "../lib/catalogs";
import { formValuesToPayload, patrimonioFormSchema, payloadToFormValues } from "../lib/form";
import type { PatrimonioFormValues, PatrimonioPayload } from "../types/patrimonio";

interface PatrimonioFormProps {
  initialPayload?: PatrimonioPayload;
  editing?: boolean;
  onSubmit: (payload: PatrimonioPayload) => Promise<void>;
  onSaveDraft: (payload: PatrimonioPayload) => Promise<void>;
}

/* ── Inline SVG Icons ────────────────────────────────── */
const IconCheck = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
);
const IconMapPin = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
);
const IconSave = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/></svg>
);
const IconArrowRight = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
);
const IconArrowLeft = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5"/><path d="m12 19-7-7 7-7"/></svg>
);

const steps = [
  { title: "Identidad", description: "Cuéntanos qué estás registrando." },
  { title: "Lugar", description: "Ubica el bien o la manifestación." },
  { title: "Valoración", description: "Describe su importancia y conservación." },
  { title: "Memoria viva", description: "Registra saberes y prácticas cuando aplique." },
  { title: "Fuentes", description: "Deja trazabilidad para futuras consultas." }
];

const stepFields: Array<Array<keyof PatrimonioFormValues>> = [
  ["nombre", "tipologia", "periodo_historico"],
  ["direccion", "longitud", "latitud"],
  ["descripcion", "valor_patrimonial", "estado_conservacion"],
  ["inmaterialExiste", "inmaterialTipo", "inmaterialContenido"],
  ["fuente", "fecha_registro", "imagenes"]
];

export default function PatrimonioForm({ initialPayload, editing = false, onSubmit, onSaveDraft }: PatrimonioFormProps) {
  const [step, setStep] = useState(0);
  const [saving, setSaving] = useState(false);
  const [draftMessage, setDraftMessage] = useState("");
  const [locationMessage, setLocationMessage] = useState("");
  const [validationMessage, setValidationMessage] = useState("");
  const form = useForm<PatrimonioFormValues>({
    resolver: zodResolver(patrimonioFormSchema),
    defaultValues: payloadToFormValues(initialPayload)
  });

  const inmaterial = form.watch("inmaterialExiste");
  const selectedTypology = form.watch("tipologia");
  const typologyHint = TIPOLOGIA_OPTIONS.find((option) => option.value === selectedTypology)?.hint;

  async function handleSaveDraft(): Promise<void> {
    setSaving(true);
    setDraftMessage("");
    try {
      await onSaveDraft(formValuesToPayload(form.getValues()));
      setDraftMessage("Borrador guardado en este dispositivo.");
    } catch {
      setDraftMessage("No pudimos guardar el borrador. Intenta nuevamente.");
    } finally {
      setSaving(false);
    }
  }

  async function handleFormSubmit(values: PatrimonioFormValues): Promise<void> {
    setSaving(true);
    setDraftMessage("");
    try {
      await onSubmit(formValuesToPayload(values));
    } finally {
      setSaving(false);
    }
  }

  function handleInvalid(errors: FieldErrors<PatrimonioFormValues>): void {
    const invalidStep = stepFields.findIndex((fields) => fields.some((field) => Boolean(errors[field])));
    if (invalidStep === -1) return;

    const firstInvalidField = stepFields[invalidStep].find((field) => Boolean(errors[field]));
    setStep(invalidStep);
    setValidationMessage("Revisa los campos marcados antes de guardar la ficha.");
    if (firstInvalidField) {
      window.setTimeout(() => form.setFocus(firstInvalidField), 0);
    }
  }

  async function handleNext(): Promise<void> {
    const valid = await form.trigger(stepFields[step], { shouldFocus: true });
    if (!valid) {
      setValidationMessage("Completa los campos marcados para continuar.");
      return;
    }

    setValidationMessage("");
    setStep((current) => current + 1);
  }

  function useCurrentLocation(): void {
    setLocationMessage("");
    if (!navigator.geolocation) {
      setLocationMessage("Este dispositivo no ofrece ubicación automática. Puedes escribir las coordenadas.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        form.setValue("longitud", position.coords.longitude.toFixed(6), { shouldValidate: true });
        form.setValue("latitud", position.coords.latitude.toFixed(6), { shouldValidate: true });
        setLocationMessage("Ubicación tomada desde el dispositivo. Confirma que corresponde al lugar registrado.");
      },
      () => setLocationMessage("No pudimos obtener tu ubicación. Revisa el permiso o escribe las coordenadas manualmente."),
      { enableHighAccuracy: true, timeout: 10000 }
    );
  }

  function errorFor(field: keyof PatrimonioFormValues): string | undefined {
    const error = form.formState.errors[field];
    return error?.message;
  }

  const fieldError = (field: keyof PatrimonioFormValues) => {
    const message = errorFor(field);
    return message ? <span className="field-error" role="alert">{message}</span> : null;
  };

  return (
    <form className="form-card" onSubmit={form.handleSubmit(handleFormSubmit, handleInvalid)}>
      <div className="stepper" aria-label="Progreso de la ficha">
        {steps.map((item, index) => (
          <div className={index === step ? "step step-active" : index < step ? "step step-complete" : "step"} key={item.title}>
            <span className="step-number">{index < step ? <IconCheck /> : index + 1}</span>
            <span className="step-label">{item.title}</span>
          </div>
        ))}
      </div>

      <div className="form-intro">
        <p className="eyebrow">Paso {step + 1} de {steps.length}</p>
        <h2>{steps[step].title}</h2>
        <p>{steps[step].description}</p>
      </div>
      {validationMessage && <div className="validation-summary" role="alert">{validationMessage}</div>}

      {step === 0 && (
        <div className="form-grid">
          <label className="field field-wide">
            <span>¿Cómo se llama?</span>
            <input {...form.register("nombre")} placeholder="Ej. Casa del Fundador" autoFocus required />
            <small>Usa el nombre conocido por la comunidad.</small>
            {fieldError("nombre")}
          </label>
          <label className="field">
            <span>Tipo de patrimonio</span>
            <select {...form.register("tipologia")} required>
              <option value="">Selecciona una opción</option>
              {TIPOLOGIA_OPTIONS.map((option) => <option value={option.value} key={option.value}>{option.label}</option>)}
            </select>
            {typologyHint && <small>{typologyHint}</small>}
            {fieldError("tipologia")}
          </label>
          <label className="field">
            <span>Periodo histórico</span>
            <select {...form.register("periodo_historico")} required>
              <option value="">Selecciona una opción</option>
              {PERIOD_OPTIONS.map((option) => <option value={option} key={option}>{option}</option>)}
            </select>
            {fieldError("periodo_historico")}
          </label>
        </div>
      )}

      {step === 1 && (
        <div className="form-grid">
          <label className="field field-wide">
            <span>Dirección o referencia</span>
            <input {...form.register("direccion")} placeholder="Ej. Carrera 9, junto a la Plaza de Bolívar" autoFocus required />
            <small>Una referencia local también sirve si no hay nomenclatura.</small>
            {fieldError("direccion")}
          </label>
          <div className="field field-wide location-actions">
            <div>
              <span className="field-label">Coordenadas</span>
              <small>La API recibe el orden longitud, latitud.</small>
            </div>
            <button className="button button-secondary" type="button" onClick={useCurrentLocation}><IconMapPin /> Usar mi ubicación</button>
          </div>
          <label className="field">
            <span>Longitud</span>
            <input {...form.register("longitud", { setValueAs: (value) => String(value).replace(",", ".") })} type="number" min="-180" max="180" step="any" inputMode="decimal" placeholder="-73.36" required />
            {fieldError("longitud")}
          </label>
          <label className="field">
            <span>Latitud</span>
            <input {...form.register("latitud", { setValueAs: (value) => String(value).replace(",", ".") })} type="number" min="-90" max="90" step="any" inputMode="decimal" placeholder="5.53" required />
            {fieldError("latitud")}
          </label>
          {locationMessage && <p className="inline-note field-wide" role="status">{locationMessage}</p>}
        </div>
      )}

      {step === 2 && (
        <div className="form-grid">
          <label className="field field-wide">
            <span>Descripción</span>
            <textarea {...form.register("descripcion")} rows={5} placeholder="Describe lo que ves, quién lo reconoce y qué historias se relacionan con ello." autoFocus required />
            <small>Escribe como si se lo contaras a otra persona interesada en el lugar.</small>
            {fieldError("descripcion")}
          </label>
          <label className="field field-wide">
            <span>¿Por qué es importante?</span>
            <textarea {...form.register("valor_patrimonial")} rows={4} placeholder="Valor histórico, artístico, social, simbólico o comunitario." required />
            {fieldError("valor_patrimonial")}
          </label>
          <label className="field">
            <span>Estado de conservación</span>
            <select {...form.register("estado_conservacion")} required>
              <option value="">Selecciona una opción</option>
              {ESTADO_OPTIONS.map((option) => <option value={option.value} key={option.value}>{option.label}</option>)}
            </select>
            {fieldError("estado_conservacion")}
          </label>
        </div>
      )}

      {step === 3 && (
        <div className="form-grid">
          <label className="toggle-field field-wide">
            <input type="checkbox" {...form.register("inmaterialExiste")} />
            <span>
              <strong>También hay una manifestación o práctica viva</strong>
              <small>Por ejemplo: una fiesta, un saber, una tradición oral o una técnica artesanal.</small>
            </span>
          </label>
          {inmaterial && (
            <>
              <label className="field field-wide">
                <span>Tipo de manifestación</span>
                <select {...form.register("inmaterialTipo")} required={inmaterial}>
                  <option value="">Selecciona una opción</option>
                  {PCI_OPTIONS.map((option) => <option value={option} key={option}>{option}</option>)}
                </select>
                {fieldError("inmaterialTipo")}
              </label>
              <label className="field field-wide">
                <span>¿Qué se practica y quiénes la mantienen viva?</span>
                <textarea {...form.register("inmaterialContenido")} rows={5} placeholder="Describe la práctica con respeto a las voces de la comunidad." required={inmaterial} />
                {fieldError("inmaterialContenido")}
              </label>
            </>
          )}
          {!inmaterial && <div className="empty-guidance field-wide">Si el registro es solo material, puedes continuar. La ficha podrá ampliarse después.</div>}
        </div>
      )}

      {step === 4 && (
        <div className="form-grid">
          <label className="field field-wide">
            <span>Fuente de la información</span>
            <textarea {...form.register("fuente")} rows={4} placeholder="Ej. Entrevista con ..., archivo de ..., observación en campo del ..." autoFocus required />
            <small>Indica quién aportó la información o qué documento consultaste. Evita incluir datos personales innecesarios.</small>
            {fieldError("fuente")}
          </label>
          <label className="field field-wide">
            <span>Enlaces de imágenes (opcional)</span>
            <textarea {...form.register("imagenes")} rows={3} placeholder="Una URL HTTPS por línea" />
            <small>La API actual solo guarda enlaces. No subas imágenes privadas sin permiso.</small>
            {fieldError("imagenes")}
          </label>
          <label className="field">
            <span>Fecha del registro</span>
            <input {...form.register("fecha_registro")} type="date" required />
            {fieldError("fecha_registro")}
          </label>
        </div>
      )}

      <div className="form-actions">
        <button className="button button-ghost" type="button" onClick={() => void handleSaveDraft()} disabled={saving}>
          <IconSave /> Guardar borrador
        </button>
        <div className="form-actions-right">
          {step > 0 && <button className="button button-secondary" type="button" onClick={() => setStep((current) => current - 1)} disabled={saving}><IconArrowLeft /> Atrás</button>}
          {step < steps.length - 1 && <button className="button button-primary" type="button" onClick={() => void handleNext()}>Continuar <IconArrowRight /></button>}
          {step === steps.length - 1 && <button className="button button-primary" type="submit" disabled={saving}>{saving ? "Guardando..." : editing ? "Guardar cambios" : "Guardar ficha"}</button>}
        </div>
      </div>
      {draftMessage && <p className="success-message" role="status">{draftMessage}</p>}
    </form>
  );
}
