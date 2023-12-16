CREATE TABLE Descuentos (
    descuento_id INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(255),
    porcentaje DECIMAL(5, 2),
    cantidad_minima_compra INT,
    importe_minimo_compra DECIMAL(10, 2),
    porcentaje_descuento_importe DECIMAL(5, 2),
    canal_clientes VARCHAR(255),
    categorias_aplicables VARCHAR(255),
    tipo_aplicabilidad ENUM('Productos', 'MontoEnSoles'),
    monto_minimo_pedido DECIMAL(10, 2),
);

CREATE TABLE BonificacionesEscalas (
    bonificacion_id INT PRIMARY KEY AUTO_INCREMENT,
    descuento_id INT,
    cantidad_compra_minima INT,
    unidades_bonificadas INT,
    FOREIGN KEY (descuento_id) REFERENCES Descuentos(descuento_id)
);

CREATE TABLE PromocionesCombinadas (
    promocion_id INT PRIMARY KEY AUTO_INCREMENT,
    descuento_id INT,
    producto_a_id INT,
    producto_b_id INT,
    descuento_porcentaje DECIMAL(5, 2),
    fecha_inicio DATE,
    fecha_fin DATE,
    FOREIGN KEY (descuento_id) REFERENCES Descuentos(descuento_id),
    FOREIGN KEY (producto_a_id) REFERENCES Productos(producto_id),
    FOREIGN KEY (producto_b_id) REFERENCES Productos(producto_id)
);