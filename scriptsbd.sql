-- Crear la base de datos
CREATE DATABASE clinica_dental;

-- Usar la base de datos
USE clinica_dental;

-- Crear la tabla Pacientes
CREATE TABLE Pacientes (
  ID_Paciente INT AUTO_INCREMENT PRIMARY KEY,
  Nombre VARCHAR(255)
);

-- Insertar datos de ejemplo en la tabla Pacientes
INSERT INTO Pacientes (Nombre) VALUES
  ('Juan Pérez'),
  ('María Gómez'),
  ('Carlos López');

-- Crear la tabla Dentistas
CREATE TABLE Dentistas (
  ID_Dentista INT AUTO_INCREMENT PRIMARY KEY,
  Nombre VARCHAR(255)
);

-- Insertar datos de ejemplo en la tabla Dentistas
INSERT INTO Dentistas (Nombre) VALUES
  ('Dr. Rodríguez'),
  ('Dra. Martínez'),
  ('Dr. López');

-- Crear la tabla Citas
CREATE TABLE Citas (
  ID_Cita INT AUTO_INCREMENT PRIMARY KEY,
  ID_Paciente INT,
  ID_Dentista INT,
  Fecha DATE,
  FOREIGN KEY (ID_Paciente) REFERENCES Pacientes(ID_Paciente),
  FOREIGN KEY (ID_Dentista) REFERENCES Dentistas(ID_Dentista)
);

-- Insertar datos de ejemplo en la tabla Citas
INSERT INTO Citas (ID_Paciente, ID_Dentista, Fecha) VALUES
  (1, 1, '2023-07-01'),
  (2, 2, '2023-07-02'),
  (3, 3, '2023-07-03');

-- Crear la tabla Tratamientos
CREATE TABLE Tratamientos (
  ID_Tratamiento INT AUTO_INCREMENT PRIMARY KEY,
  Descripcion VARCHAR(255),
  ID_Cita INT,
  FOREIGN KEY (ID_Cita) REFERENCES Citas(ID_Cita)
);

-- Insertar datos de ejemplo en la tabla Tratamientos
INSERT INTO Tratamientos (Descripcion, ID_Cita) VALUES
  ('Limpieza dental', 1),
  ('Extracción de muelas', 2),
  ('Blanqueamiento dental', 3);