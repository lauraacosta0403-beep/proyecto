import React, { useState, useEffect } from "react";
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, Tooltip, Legend } from "recharts";

// ---------------------------
// Componente Stars
// ---------------------------
const Stars = ({ value = 0 }) => {
  const stars = Array.from({ length: 5 }).map((_, i) => (
    <svg
      key={i}
      className={`w-4 h-4 inline-block ${i < value ? "text-yellow-400" : "text-gray-300"}`}
      viewBox="0 0 20 20"
      fill="currentColor"
    >
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.96a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.37 2.455a1 1 0 00-.364 1.118l1.287 3.96c.3.921-.755 1.688-1.54 1.118l-3.37-2.455a1 1 0 00-1.176 0l-3.37 2.455c-.785.57-1.84-.197-1.54-1.118l1.287-3.96a1 1 0 00-.364-1.118L2.063 9.387c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.69l1.286-3.96z" />
    </svg>
  ));
  return <span className="inline-flex">{stars}</span>;
};

// ---------------------------
// TarjetaJuego
// ---------------------------
const TarjetaJuego = ({ juego, onEdit, onDelete, onToggle, onOpenResenas }) => (
  <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-4 shadow-lg hover:scale-[1.02] transition-transform duration-200">
    <div className="flex gap-3">
      <img
        src={juego.portada || "https://via.placeholder.com/120x160?text=Cover"}
        alt={juego.titulo}
        className="w-28 h-36 object-cover rounded-lg shadow-md"
      />
      <div className="flex-1">
        <h3 className="text-lg font-semibold">{juego.titulo}</h3>
        <p className="text-sm text-gray-300">{juego.plataforma || "Multi"} • {juego.genero || "Indie"}</p>
        <div className="mt-2">
          <Stars value={Math.round(juego.puntuacion || 0)} />
          <span className="ml-2 text-xs text-gray-400">{juego.horas || 0} hrs</span>
        </div>
        <div className="mt-3 flex items-center gap-2">
          <button
            onClick={() => onOpenResenas(juego)}
            className="px-2 py-1 text-xs rounded-md bg-indigo-600/90 hover:bg-indigo-700"
          >
            Reseñas
          </button>
          <button
            onClick={() => onToggle(juego)}
            className={`px-2 py-1 text-xs rounded-md ${juego.completado ? "bg-green-600/90" : "bg-gray-700/60"}`}
          >
            {juego.completado ? "Completado" : "Marcar como completado"}
          </button>
          <div className="ml-auto flex gap-2">
            <button onClick={() => onEdit(juego)} className="text-sm px-2 py-1 bg-yellow-600/90 rounded-md">
              Editar
            </button>
            <button onClick={() => onDelete(juego)} className="text-sm px-2 py-1 bg-red-600/90 rounded-md">
              Eliminar
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
);

// ---------------------------
// FormularioJuego
// ---------------------------
const FormularioJuego = ({ initial = {}, onCancel, onSubmit }) => {
  const [form, setForm] = useState({
    titulo: "",
    plataforma: "",
    genero: "",
    portada: "",
    puntuacion: 0,
    horas: 0,
    ...initial,
  });

  const submit = (e) => {
    e.preventDefault();
    onSubmit(form);
    setForm({ titulo: "", plataforma: "", genero: "", portada: "", puntuacion: 0, horas: 0 });
  };

  return (
    <form className="bg-gradient-to-br from-white/3 to-white/6 p-4 rounded-xl border border-white/8 shadow-md" onSubmit={submit}>
      <h3 className="text-lg font-bold mb-2">{initial._id ? "Editar juego" : "Agregar juego"}</h3>
      <div className="grid grid-cols-2 gap-2">
        <input
          placeholder="Título"
          value={form.titulo}
          onChange={(e) => setForm({ ...form, titulo: e.target.value })}
          className="p-2 rounded-md bg-white/5"
          required
        />
        <input
          placeholder="Plataforma"
          value={form.plataforma}
          onChange={(e) => setForm({ ...form, plataforma: e.target.value })}
          className="p-2 rounded-md bg-white/5"
        />
        <input
          placeholder="Género"
          value={form.genero}
          onChange={(e) => setForm({ ...form, genero: e.target.value })}
          className="p-2 rounded-md bg-white/5"
        />
        <input
          placeholder="Portada URL"
          value={form.portada}
          onChange={(e) => setForm({ ...form, portada: e.target.value })}
          className="p-2 rounded-md bg-white/5"
        />
        <input
          type="number"
          placeholder="Puntuación (0-5)"
          value={form.puntuacion}
          onChange={(e) => setForm({ ...form, puntuacion: Number(e.target.value) })}
          className="p-2 rounded-md bg-white/5"
          min={0}
          max={5}
        />
        <input
          type="number"
          placeholder="Horas jugadas"
          value={form.horas}
          onChange={(e) => setForm({ ...form, horas: Number(e.target.value) })}
          className="p-2 rounded-md bg-white/5"
          min={0}
        />
      </div>
      <div className="mt-3 flex gap-2">
        <button type="submit" className="px-3 py-1 rounded-md bg-indigo-600/90">
          Guardar
        </button>
        <button type="button" onClick={onCancel} className="px-3 py-1 rounded-md bg-gray-700/60">
          Cancelar
        </button>
      </div>
    </form>
  );
};


