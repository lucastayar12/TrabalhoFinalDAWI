
Dados = {

    entrar: () => {

        var t = {};

        t.login = $('#user').val();
        t.password = $('#pswd').val();


        $.ajax({
            type: 'GET',
            url: '/admin',
            data: t,
            success: (data) => {

                window.location.href = '/admin';
            }
        })
    },

    tamplateMembros: (data) => {

        var tupla = $("#Membros");
        tupla.html('');

        data.forEach(element => {
            var row = document.createElement('tr');

            var tdId = document.createElement('td');
            var tdNome = document.createElement('td');
            var tdCargo = document.createElement('td');
            var tdFoto = document.createElement('td');
            var img = document.createElement('img');
            tdId.innerHTML = String(element.id);
            tdNome.innerHTML = String(element.nome);
            tdCargo.innerHTML = String(element.cargo);

            img.src = String(element.img);
            img.style = "width: 50px; height: 50px;";
            tdFoto.append(img);

            var tdBtns = document.createElement('td');
            var btnExcluir = document.createElement('button');
            row.setAttribute("id", "Registro ID:" + element.id);

            $(btnExcluir).on("click", (event) => {
                Dados.remove(event.target);
            });

            var btnEdit = document.createElement('button');

            btnExcluir.setAttribute('class', 'btn btn-danger');
            btnEdit.setAttribute('class', 'btn btn-primary');

            btnExcluir.innerHTML = "x";
            btnEdit.innerHTML = "Edit";

            $(btnEdit).on("click", (event) => {
                Dados.consultaId(event.target);
            });

            row.append(tdId);
            row.append(tdNome);
            row.append(tdCargo);
            row.append(tdFoto);
            tdBtns.append(btnEdit);
            tdBtns.append(btnExcluir);
            row.append(tdBtns);

            tupla.append(row);
        });

    },

    remove: (button) => {

        var registro = $(button).parent().parent();
        var id = $(registro).attr("id").replace("Registro ID:", "");

        $.ajax({
            type: "DELETE",
            url: "/admin/deletar",
            data: { "id": id },
            success: (data) => {
                $(registro).remove();

            },
            error: () => {

            }
        })
    },

    mudarEstadoListar: (el) => {
        var display = document.getElementById(el).style.display;
        if (display == "none") {
            document.getElementById(el).style.display = 'block';

            if (document.getElementById('RegistrarMembro').style.display == 'block' || document.getElementById('AplicacoesCRUD').style.display == 'block')
            {
                document.getElementById('RegistrarMembro').style.display = 'none';
                document.getElementById('AplicacoesCRUD').style.display = 'none';
            }
                

            $.ajax({
                type: "GET",
                url: "/admin/listar",
                success: (data) => {
                    Dados.tamplateMembros(data);
                },
                dataType: "json"
            })
        }
        else
            document.getElementById(el).style.display = 'none';
    },

    mudarEstado: (el) => {
        var display = document.getElementById(el).style.display;
        if (display == "none") {
            document.getElementById(el).style.display = 'block';
            if (document.getElementById('ListarMembro').style.display == 'block' || document.getElementById('AplicacoesCRUD').style.display == 'block') {
                document.getElementById('ListarMembro').style.display = 'none';
                document.getElementById('AplicacoesCRUD').style.display = 'none';
            }

        }
        else
            document.getElementById(el).style.display = 'none';
    },


    salvarMembro: () => {
        var t = {};

        t.nome = $("#nome").val();
        t.cargo = $("#cargo").val();
        t.img = $("#imgBase64").get(0).innerHTML;

        $.ajax({
            type: "POST",
            url: "/admin/salvar",
            data: t,
            dataType: "json",
            success: (data) => {
                console.log(data);
                var Registrar = document.getElementById('RegistrarMembro');
                Registrar.style.display = 'none';
                $('#imgBase64').innerHTML = '';
            },
            error: () => {
                $('#imgBase64').innerHTML = '';
            }

        })


    },

    consultaId: (button) => {

        var registro = $(button).parent().parent();
        var id = $(registro).attr("id").replace("Registro ID:", "");
        var Listar = document.getElementById('ListarMembro');
        Listar.style.display = 'none';
        var Registrar = document.getElementById('RegistrarMembro');
        Registrar.style.display = 'block';

        console.log(id);

        $.ajax({
            type: 'POST',
            url: "/admin/atualizar",
            data: { "id": id },
            success: (data) => {
                Dados.tamplateEdita(data)
            }
        })
    },

    tamplateEdita: (data) => {

        $('#nome').val(data.nome);
        $('#cargo').val(data.cargo);
        $('#imgBase64').html(data.img);

        var p = $('#idEdit');
        p.html(data.id);

    },

    edita: () => {

        var t = {};
        t.id = document.getElementById('idEdit').innerHTML;
        t.nome = $('#nome').val();
        t.cargo = $('#cargo').val();
        t.img = $("#imgBase64").get(0).innerHTML;

        $.ajax({
            type: 'PUT',
            url: "/admin/atualizar",
            data: t,
            success: (data) => {
                console.log(data);
                var Listar = document.getElementById('RegistrarMembro');
                Listar.style.display = 'none';
            }
        })
    },

    aplica: () => {

        var t = {};

        t.familia = $('#familia').val();
        t.discord = $('#discord').val();


        $.ajax({
            type: 'POST',
            url: '/aplicase',
            data: t,
            success: (data) => {

                alert(data)

            }
        })
    },

    mudarEstadoListar2: (el) => {
        var display = document.getElementById(el).style.display;
        if (display == "none") {
            document.getElementById(el).style.display = 'block';

            if (document.getElementById('RegistrarMembro').style.display == 'block' || document.getElementById('ListarMembro').style.display == 'block') {
                document.getElementById('RegistrarMembro').style.display = 'none';
                document.getElementById('ListarMembro').style.display = 'none';
            }


            $.ajax({
                type: "GET",
                url: "/admin/aplicacoes",
                success: (data) => {
                    Dados.tamplateAplicar(data);
                },
                dataType: "json"
            })
        }
        else
            document.getElementById(el).style.display = 'none';
    },

    tamplateAplicar: (data) => {

        var tupla = $("#Aplicacoes");
        tupla.html('');

        data.forEach(element => {
            var row = document.createElement('tr');

            var tdId = document.createElement('td');
            var tdFamilia = document.createElement('td');
            var tdDiscord = document.createElement('td');

            tdId.innerHTML = String(element.id);
            tdFamilia.innerHTML = String(element.familia);
            tdDiscord.innerHTML = String(element.discord);



            var tdBtns = document.createElement('td');
            var btnExcluir = document.createElement('button');
            row.setAttribute("id", "Registro ID:" + element.id);

            $(btnExcluir).on("click", (event) => {
                Dados.remove2(event.target);
            });

            btnExcluir.setAttribute('class', 'btn btn-danger');

            btnExcluir.innerHTML = "x";


            row.append(tdId);
            row.append(tdFamilia);
            row.append(tdDiscord);
            tdBtns.append(btnExcluir);
            row.append(tdBtns);

            tupla.append(row);
        });

    },

    remove2: (button) => {

        var registro = $(button).parent().parent();
        var id = $(registro).attr("id").replace("Registro ID:", "");

        $.ajax({
            type: "DELETE",
            url: "/admin/deletarA",
            data: { "id": id },
            success: (data) => {
                $(registro).remove();

            },
            error: () => {

            }
        })
    },


}

window.onload = () => {

    $.ajax({

        type: "GET",
        url: "/membros/listar",
        success: (data) => {


            var row = document.createElement('div');
            row.setAttribute('class', "row");
            var body = document.getElementById('MembrosList');
            data.forEach(element => {

                var col3 = document.createElement('div');
                var img = document.createElement('img');
                var h5 = document.createElement('h5');
                var span = document.createElement('span');


                col3.setAttribute("class", "col-3");
                img.setAttribute("class", "img-fluid rounded-circle");
                span.setAttribute("class", "badge bg-white");
                span.style = "color: black; margin-bottom: 20px;"
                span.innerHTML = element.cargo;
                img.src = String(element.img);
                img.style = "width: 150px; height: 150px";
                h5.innerHTML = element.nome;



                row.append(col3);
                col3.append(img);
                col3.append(h5)
                col3.append(span)

            });
            body.append(row);

        }
    });
}


