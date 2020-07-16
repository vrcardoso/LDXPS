const cliente= require('./conect.js')

cliente.connect()



// Exibir Lista de vendedores na home
function homeVendedores(){
    $('#vendedores').empty();
     vends='<option selected value="">Todos</option>';
     $('#vendedores').append(vends);
    const text = 'SELECT * FROM Vendedores'
        // callback
        cliente.query(text,(err, res) => {
        if (err) {
            console.log(err.stack);
        } else {
           res.rows.forEach(element => {
               
                vends='<option value="'+element.cdvend+'">'+element.dsnome+'</option>';
               $('#vendedores').append(vends);
           });
        }
        })


}




//Exibir tabela cliente na home
function homeClientes(vendedor){
    // Caso vazio exibir todos os clientes
    //Caso contrario exibir clientes do venddor correspondente
    if(vendedor==''){
        const text = 'SELECT * FROM CLIENTES'
        // callback
        cliente.query(text,(err, res) => {
        if (err) {
            console.log(err.stack)
        } else {
            criaTabelaClientes(res.rows);
        }
        })

    }else{
            const text = 'SELECT * FROM CLIENTES WHERE cdvend = $1'
            var values=[vendedor]
            // callback
            cliente.query(text, values, (err, res) => {
            if (err) {
                console.log(err.stack)
            } else {
                criaTabelaClientes(res.rows);
            }
            })
        }

}





//Cria Tabela de Clientes
function criaTabelaClientes(rows){
        $('#t_clientes').empty();
    //Cabeçalho da tabela
        clie='<thead>'+
        '<tr>'+
            '<th>#</th>'+
            '<th>Nome</th>'+
            '<th>Tipo</th>'+
            '<th>Credito</th>'+
        '</tr>'+
    '</thead>';


        $('#t_clientes').append(clie);

        //Corpo da tabela
        $('#t_clientes').append('<tbody>');
    rows.forEach(element => {
        clien='<tr>'+
                '<td><input type="radio" name="esc_cli" value="'+element.cdcl+'"></td>'+
                '<td>'+element.dsnome+'</td>'+
                '<td>'+element.idtipo+'</td>'+
                '<td>'+element.dslim+'</td>'+
                '</tr>';
                $('#t_clientes').append(clien);
    });
    $('#t_clientes').append('</tbody>');

}






// Chama funcao de criaçõa de tabela
function mudaTabela(){
    vendedor=$('#vendedores').val()
    homeClientes(vendedor);

}







//Escreve valores na tela cadastro Vendedor
function editaVendedor(){
    vendedor=$('#vendedores').val()
    const text = 'SELECT * FROM Vendedores WHERE cdvend = $1'
    // callback
    cliente.query(text,[vendedor],(err, res) => {
    if (err) {
        console.log(err.stack);
    } else {
       vend= res.rows[0];
       console.log(vend);
       $('#nome_vend').attr('value',vend.dsnome);
       $('#cod_tab_preco').attr('value',vend.cdtab);
       d= new Date(vend.dtnasc);
       tempo=d.getUTCFullYear()+'-'+d.getMonth()+'-'+d.getUTCDate();
       console.log(tempo);
       $('#date_nasc_vend').attr('value',tempo);
       $('#cod_vend').attr('value',vend.cdvend);
       console.log(vend.cdvend);
        //busca clientes do vendedor
       const text = 'SELECT * FROM CLIENTES WHERE cdvend = $1'
            var values=[vendedor]
            // callback
            cliente.query(text, values, (err, res) => {
            if (err) {
                console.log(err.stack)
            } else {
                res.rows.forEach(element => {
               
                    vends='<option value="'+element.cdvend+'">'+element.dsnome+'</option>';
               $('#clientes_vend').append(vends);
               });
                
            }
            })
       
       
    }
    })


}


function updateVendedor(){

    nome=$('#nome_vend').val();
    codTab=$('#cod_tab_preco').val();
    dataNas=$('#date_nasc_vend').val();
    console.log(dataNas);
    codvend= $('#cod_vend').val();
    const text = 'UPDATE VENDEDORES SET(dsnome,cdtab,dtnasc)=($1,$2,$3) WHERE cdvend=($4) ';
    const values=[nome,codTab,dataNas,codvend];
    cliente.query(text,values,(err, res) => {
    if (err) {
        console.log(err.stack)
    } else {
        homeVendedores();
        mudaTabela();
        $("#janela_vendedor").modal('hide');       
    }
    })


}


//Criação de vendedor no banco de dados pela janela cadastro vendedor
function criaVendedor(){
    nome=$('#nome_vend').val();
    codTab=$('#cod_tab_preco').val();
    dataNas=$('#date_nasc_vend').val();

    const text = 'INSERT INTO VENDEDORES(dsnome,cdtab,dtnasc) VALUES($1,$2,$3)'
    const values=[nome,codTab,dataNas]
    cliente.query(text,values,(err, res) => {
    if (err) {
        console.log(err.stack)
    } else {
        homeVendedores();
        mudaTabela();
        $("#janela_vendedor").modal('hide');       
    }
    })

}




// Exclui Vendedor
function excluiVend() {
    codigovend=$('#cod_vend').val();
    console.log($('#cod_vend').val());
    console.log($('#nome_vend').val());

    const text = 'UPDATE CLIENTES SET (cdvend)=($1) WHERE cdvend=($2)'
        // callback
        valores=[null,codigovend]
        cliente.query(text,valores,(err, res) => {
        if (err) {
            console.log(err.stack);
        } else {

            const text = 'DELETE FROM VENDEDORES WHERE cdvend=($1)';
            cliente.query(text,[codigovend],(err, res) => {
            if (err) {
                console.log(err.stack)
            } else {
                homeVendedores();
                mudaTabela();
                $("#janela_vendedor").modal('hide');       
            }  
             });


        }
        })

    



}






//---------------Cliente----------------------------------



// Mostra na janela Cadastro Cliente os dados do cliente selecionado
function editaCliente(){

    var radioValue = $("input[name='esc_cli']:checked").val();
    const text = 'SELECT * FROM CLIENTES WHERE cdcl = $1';
            var values=[radioValue];
            // callback
            cliente.query(text, values, (err, res) => {
            if (err) {
                console.log(err.stack)
            } else {
               qClie= res.rows[0];
               $('#nome_cli').attr('value',qClie.dsnome);
               $('#t_pessoa').attr('value',qClie.idtipo);
               $('#limite_cred').attr('value',qClie.dslim);
               $('#cli_cod').attr('value',qClie.cdcl);

                if(qClie.cdvend!=null){
               const text = 'SELECT * FROM VENDEDORES WHERE cdvend = $1'
               var values=[qClie.cdvend];
               // pega nome do vendedor
               cliente.query(text, values, (err, resp) => {
               if (err) {
                   console.log(err.stack);
               } else {
                   $('#nome_vendedor').attr('value',resp.rows[0].dsnome);
               };
               
            })};
            }});
}




//Da update no cliente
function updateCliente(){
   nomeCliente= $('#nome_cli').val();
   tipoPessoa=$('#t_pessoa').val();
   limiteCred= $('#limite_cred').maskMoney('unmasked')[0];
   codigocli=$('#cli_cod').val();
   nomeVend=$('#nome_vendedor').val();
    //Caso Ven
   if(nomeVend!=''){
    const text = 'SELECT * FROM VENDEDORES WHERE dsnome = $1'
    // pega codigo do vendedor apartir do nome
    cliente.query(text, [nomeVend], (err, res) => {
    if (err) {
        console.log(err.stack);
    } else {
        //codigo do vendeor
        codigoVend=res.rows[0].cdvend;
        const text = 'UPDATE CLIENTES SET(dsnome,idtipo,cdvend,dslim)=($1,$2,$3,$4) WHERE cdcl=($5)';
        const values=[nomeCliente,tipoPessoa,codigoVend,limiteCred,codigocli];
         cliente.query(text,values,(err, res) => {
    if (err) {
        console.log(err.stack)
    } else {
        mudaTabela();
        $("#janela_cliente").modal('hide');       
    }
    });
}
    })
}else{
    codigoVend=null;            
   const text = 'UPDATE CLIENTES SET(dsnome,idtipo,cdvend,dslim)=($1,$2,$3,$4) WHERE cdcl=($5)';
   const values=[nomeCliente,tipoPessoa,codigoVend,limiteCred,codigocli];
   cliente.query(text,values,(err, res) => {
   if (err) {
       console.log(err.stack)
   } else {
       mudaTabela();
       $("#janela_cliente").modal('hide');       
   }
    });


}

}





// Cria Cliente
function criaCliente() {

    nomeCliente=$('#nome_cli').val();
    tipoPessoa=$('#t_pessoa').val();
    limiteCred=$('#limite_cred').maskMoney('unmasked')[0];
    console.log(limiteCred);
    codigoVend=null;
     if($('#nome_vendedor').val()!=null){
    const text = 'SELECT * FROM VENDEDORES WHERE dsnome = $1'
    // pega nome do vendedor
    cliente.query(text, [$('#nome_vendedor').val()], (err, res) => {
    if (err) {
        console.log(err.stack);
    } else {
        codigoVend=res.rows[0].cdvend;
        console.log(res.rows[0].cdvend);
        console.log(codigoVend);
    //Insert na tabela cliente
    const text = 'INSERT INTO Clientes(dsnome,idtipo,cdvend,dslim) VALUES($1,$2,$3,$4)'
    const values=[nomeCliente,tipoPessoa,codigoVend,limiteCred]
    cliente.query(text,values,(err, res) => {
    if (err) {
        console.log(err.stack)
    } else {
        mudaTabela();
        $("#janela_cliente").modal('hide');       
    }
    })
    }
    })}else{
    console.log(codigoVend);
    //Insert na tabela cliente
    const text = 'INSERT INTO Clientes(dsnome,idtipo,cdvend,dslim) VALUES($1,$2,$3,$4)'
    const values=[nomeCliente,tipoPessoa,codigoVend,limiteCred]
    cliente.query(text,values,(err, res) => {
    if (err) {
        console.log(err.stack)
    } else {
       mudaTabela();
        $("#janela_cliente").modal('hide');       
    }
    })}
    
};






//Exlui Cliente
function excluiCliente(){
    codigocli=$('#cli_cod').val();
    
   const text = 'DELETE FROM CLIENTES WHERE cdcl=($1)';
   const values=[codigocli];
   cliente.query(text,values,(err, res) => {
   if (err) {
       console.log(err.stack)
   } else {
       mudaTabela();
       $("#janela_cliente").modal('hide');       
   }
    });

}







// Cria modal Cadastro Vendedor
function criaJanelaVend(opcao){

    /*apaga possivel modal ja existente */
    $("#janelas").empty();
    /*Cria modal do vendedor */
   html='<div class="modal fade" id="janela_vendedor"> '+
        '<div class="modal-dialog">'+
        '<div class="modal-content">'+
        /*inicio cabeçalho */
        '<div class="modal-header">'+
        '<h5 class="modal-title" id="titulo_vend">Cadastro Vendedor</h5>'+
        '<button type="button" class="close" data-dismiss="modal">'+
        '&times; </button>'+
        '</div>'+
        /*fim cabeçalho */
        /*inicio corpo */
        '<div class="modal-body">'+
        /* Formularios */
        '<form>'+
        /*Nome do vendedor*/
        '<div class="form-group">'+
        '<label for="nome_vend">Nome</label>'+
        '<input type="text" maxlength="50" class="form-control" id="nome_vend">'+
        '</div>'+
        /*Codigo da tabela de precos*/
        '<div class="form-group">'+
        '<label for="cod_tab_preco">Codigo da tabela de precos</label>'+
        '<input type="number" class="form-control" id="cod_tab_preco">'+
        '</div>'+
        /*Data de nascimento do vendedor*/
        '<div class="form-group">'+
        '<label for="date_nas_vend">Nascimento</label>'+
        '<input type="date" class="form-control" id="date_nasc_vend">'+
        '</div>';
        //Clientes do vendedor so aparecem na ediçao
        if(opcao==1){
            /*Clientes do vendedor*/
            html+='<div class="form-group">'+
            '<label for="clientes_vend">Clientes</label>'+
            '<select class="custom-select custom-select-sm d-block" id="clientes_vend">'+
            '</select>'+
            '</div>'+
            '<input type="hidden" id="cod_vend">';
        }


        html+='</form>'+
        '</div>'+
        /*Final do corpo */
        /*Inicio do rodape */
        '<div class="modal-footer">';
    /*Botao Confirma e exclui, se opcao==1 entao botao confirma salva alteracao, e exclui existe  */
    if(opcao==1){
        html+=  '<button id="btn_edit_vend" type="button" class="btn btn-success" onclick=updateVendedor()>Confirmar</button>'+
                '<button id="exclui_vend" type="button" class="btn btn-secondary" onclick=excluiVend()>excluir</button>';
                editaVendedor();

    }else{
        html+='<button id="btn_cria_vend" type="button" class="btn btn-success" onclick= "criaVendedor()">Confirmar</button>';
             
    }
    /*Botao Cria cliente */
   html+= '<button id="btn_cli_vend" type="button" class="btn btn-primary" onclick="abreJanela(1)">Criar Cliente</button>'+
            '</div>'+
            '</div>'+
            '</div>'+
            '</div>';

    $("#janelas").append(html)
    $('#janela_vendedor').modal()

}







/*Funcao cria modal Cadastro Cliente */
function criaJanelaCli(opcao) {

     /*apaga possivel modal ja existente */
     $("#janelas").empty();
     /*Cria modal do Cliente */
    html='<div class="modal fade" id="janela_cliente"> '+
         '<div class="modal-dialog">'+
         '<div class="modal-content">'+
         /*inicio cabeçalho */
         '<div class="modal-header">'+
         '<h5 class="modal-title" id="titulo_cli">Cadastro Cliente</h5>'+
         '<button type="button" class="close" data-dismiss="modal">'+
         '&times; </button>'+
         '</div>'+
         /*fim cabeçalho */
         /*inicio corpo */
         '<div class="modal-body">'+
         /* Formularios */
         '<form>'+
         /*Nome do cliente*/
         '<div class="form-group">'+
         '<label for="nome_cli">Nome</label>'+
         '<input type="text" maxlength="50" class="form-control" id="nome_cli">'+
         '</div>'+
         /*Codigo da Tipo de pessoa*/
         '<div class="form-group">'+
         '<label for="t_pessoa">Tipo de Pessoa</label>'+
         '<select class="custom-select custom-select-sm d-block" id="t_pessoa">'+
         '<option selected value="PF">PF-Pessoa Fisica</option>'+
         '<option value="PJ">PJ-Pessoa Juridica</option>'+
         '</select>'+
         '</div>'+
         /*vendedor*/
         '<div class="form-group">'+
         '<label for="nome_vendedor">Vendedor</label>'+
         '<input type="text" maxlength="50" class="form-control" id="nome_vendedor">'+
         '</div>'+
         /*Limite de credito do cliente*/
         '<div class="form-group">'+
         '<label for="limite_cred">Limite de Credito</label>'+
         '<input type="text" class="form-control" id="limite_cred">'+
         '</div>'+
         '<input type="hidden" id="cli_cod">'+
 
         '</form>'+
         '</div>'+
         /*Final do corpo */
         /*Inicio do rodape */
         '<div class="modal-footer">';
     /*Botao Confirma e exclui, se opcao==1 entao botao confirma salva alteracao, e exclui existe  */
     if(opcao==1){
         html+=  '<button id="btn_edit_cli" type="button" class="btn btn-success" onclick=updateCliente()>Confirmar</button>'+
                 '<button id="exclui_cli" type="button" class="btn btn-secondary" onclick=excluiCliente()>excluir</button>';
                 editaCliente();
 
     }else{
         html+='<button id="btn_cria_cli" type="button" class="btn btn-success" onclick= "criaCliente()">Confirmar</button>';
     }
     /*Botao Cria cliente */
    html+= '<button id="btn_vend_cli" type="button" class="btn btn-primary" onclick="abreJanela(2)">Criar Vendedor</button>'+
             '</div>'+
             '</div>'+
             '</div>'+
             '</div>';
 
     $("#janelas").append(html)
     $(function() {
        $("#limite_cred").maskMoney({prefix:'R$ ', allowNegative: true, thousands:'.', decimal:',', affixesStay: false});
      })
     $('#janela_cliente').modal()
    
}








function abreJanela(opcoes) {
    if(opcoes==1){
        $("#janela_vendedor").modal('hide');
        $('#janela_vendedor').on('hidden.bs.modal', function () {
            criaJanelaCli(2);
          })
    }else{
        $("#janela_cliente").modal('hide');
        $('#janela_cliente').on('hidden.bs.modal', function () {
            criaJanelaVend(2);
          })
    }
    
}




//Esconde o botao de edição de vendedores caso a opção todos esteja ativa

function escondeEditVend(){
    esconde=$('#vendedores').val();
    if(esconde==''){
        $('#edita_vend').hide();
    }else{
        $('#edita_vend').show();
    }

}