INSERT INTO department (_name)
VALUES ("Shipping"),
       ("Receiving"),
       ("Accounting"),
       ("Accounts");
       

INSERT INTO role (title, salary,department_id)
VALUES ("Manager", 40000.00, 1),
       ("Junior", 30000.00, 4),
       ("Senior", 50000.00, 4);

INSERT INTO employee (first_name, last_name,role_id, manager_id)
VALUES ("Guy", "McGuyserson", 4, 2),
       ("Jefe", "McBosserson", 4, 3),
       ("Greg", "Cantrell", 3);

