import json

with open(r'C:\Users\fabio\OneDrive\Documentos\Calculabs\Calculabs-Dev\calculabs\src\data\articles.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

content = '''<h1>Regra de Três: Como Calcular, Tipos e Aplicações Práticas</h1>

<p>A regra de três é uma das ferramentas matemáticas mais poderosas e versáteis que existem. Ela permite resolver problemas de proporcionalidade de forma simples e eficiente, conectando três valores conhecidos para descobrir um quarto valor desconhecido. Presente em situações do cotidiano como cálculo de velocidade, consumo de combustível, preços proporcionais e até mesmo na análise de dados científicos, a regra de três é fundamental para qualquer pessoa que precisa tomar decisões baseadas em números.</p>

<p>Muitos estudantes aprendem a regra de três de forma mecânica, aplicando fórmulas sem entender o conceito subjacente. Isso leva a erros frequentes quando a situação se torna mais complexa. Neste artigo, vamos explorar a regra de três desde seus fundamentos até aplicações avançadas, garantindo que você compreenda não apenas como aplicá-la, mas por que ela funciona e quando utilizá-la corretamente.</p>

<h2>O que é regra de três</h2>

<p>A regra de três é um método matemático que estabelece uma relação de proporcionalidade entre quatro valores, sendo que três deles são conhecidos e um é desconhecido. Ela se baseia no princípio fundamental de que grandezas proporcionais mantêm sempre a mesma razão entre si.</p>

<p>O nome "regra de três" vem do fato de que, historicamente, esse método envolvia três termos conhecidos e um quarto termo a ser encontrado. Embora hoje em dia utilizemos apenas quatro termos (três conhecidos e um desconhecido), o nome tradicional se mantém.</p>

<p>Matematicamente, a regra de três pode ser expressa assim:</p>

<p>Se A está para B, assim como C está para X</p>
<p>Então: A/B = C/X</p>

<p>Onde A, B e C são valores conhecidos, e X é o valor que queremos descobrir. Essa relação pode ser resolvida através da equação:</p>

<p>X = (B × C) / A</p>

<p>Ou, de forma mais intuitiva:</p>

<p>X = C × (B/A)</p>

<p>O importante é entender que estamos sempre multiplicando os meios e dividindo pelos extremos, ou vice-versa, dependendo da estrutura do problema.</p>

<h3>Por que a regra de três é tão importante</h3>

<p>A regra de três permite resolver problemas que envolvem taxas, velocidades, densidades, preços por unidade e qualquer situação onde exista uma relação proporcional entre grandezas. Ela é especialmente útil quando:</p>

<ul>
<li>Precisamos comparar diferentes quantidades</li>
<li>Há necessidade de escalar valores (aumentar ou reduzir proporcionalmente)</li>
<li>Estamos lidando com taxas ou razões</li>
<li>Queremos encontrar equivalências</li>
</ul>

<p>Sem a regra de três, muitas decisões do dia a dia seriam muito mais difíceis. Por exemplo, como saber se um produto está em oferta se os preços estão apresentados de forma diferente? Como calcular o consumo de combustível em uma viagem? Como determinar a velocidade média baseada em distância e tempo? Todas essas situações envolvem proporcionalidade e podem ser resolvidas com a regra de três.</p>

<h3>Conceito de proporcionalidade</h3>

<p>A base da regra de três é o conceito de proporcionalidade. Duas grandezas são proporcionais quando a razão entre elas permanece constante. Existem dois tipos principais de proporcionalidade:</p>

<h4>Proporcionalidade Direta</h4>

<p>Ocorre quando o aumento de uma grandeza provoca o aumento proporcional da outra. Por exemplo:</p>

<ul>
<li>Quanto mais quilômetros você dirige, mais combustível consome</li>
<li>Quanto mais horas você trabalha, mais salário recebe</li>
<li>Quanto maior a quantidade de produto, maior o preço total</li>
</ul>

<p>Neste caso, se uma grandeza dobra, a outra também dobra.</p>

<h4>Proporcionalidade Inversa</h4>

<p>Ocorre quando o aumento de uma grandeza provoca a diminuição proporcional da outra. Por exemplo:</p>

<ul>
<li>Quanto mais pessoas dividem uma pizza, menos cada uma recebe</li>
<li>Quanto mais rápido você dirige, menos tempo leva para chegar ao destino</li>
<li>Quanto maior a velocidade, menor o tempo de viagem</li>
</ul>

<p>Neste caso, se uma grandeza dobra, a outra é reduzida à metade.</p>

<p>A regra de três trabalha principalmente com proporcionalidade direta, mas também pode ser adaptada para situações de proporcionalidade inversa.</p>

<h2>Regra de três simples</h2>

<p>A regra de três simples é a forma mais básica e direta de aplicação do método. Ela envolve apenas duas grandezas relacionadas proporcionalmente. Vamos ver como funciona passo a passo.</p>

<h3>Estrutura básica</h3>

<p>A estrutura da regra de três simples é:</p>

<p>Valor A → Valor B</p>
<p>Valor C → Valor X (desconhecido)</p>

<p>Ou, em forma de proporção:</p>

<p>A / B = C / X</p>

<p>A resolução se dá por:</p>

<p>X = (B × C) / A</p>

<h3>Exemplo prático: Consumo de combustível</h3>

<p>Um carro consome 8 litros de gasolina para percorrer 120 km. Quantos litros ele consumirá para percorrer 300 km?</p>

<p><strong>Passo 1:</strong> Identificar as grandezas proporcionais</p>
<p>Distância percorrida e consumo de combustível são grandezas diretamente proporcionais. Quanto maior a distância, maior o consumo.</p>

<p><strong>Passo 2:</strong> Montar a proporção</p>
<p>120 km → 8 litros</p>
<p>300 km → X litros</p>

<p><strong>Passo 3:</strong> Escrever a equação</p>
<p>120 / 8 = 300 / X</p>

<p><strong>Passo 4:</strong> Resolver a equação</p>
<p>120 × X = 8 × 300</p>
<p>120X = 2.400</p>
<p>X = 2.400 / 120</p>
<p>X = 20 litros</p>

<p><strong>Passo 5:</strong> Verificar a resposta</p>
<p>Se 120 km consomem 8 litros, então cada km consome 8/120 = 0,0667 litros. Para 300 km: 300 × 0,0667 = 20 litros. Correto!</p>

<h3>Exemplo prático: Preço proporcional</h3>

<p>Uma loja vende maçãs a R$ 4,50 por kg. Se você comprar 2,5 kg, quanto pagará?</p>

<p><strong>Análise:</strong></p>
<p>Quantidade e preço são diretamente proporcionais. Quanto mais maçãs, maior o preço.</p>

<p>1 kg → R$ 4,50</p>
<p>2,5 kg → X</p>

<p>1 / 4,50 = 2,5 / X</p>
<p>X = (4,50 × 2,5) / 1</p>
<p>X = R$ 11,25</p>

<p>Este exemplo parece trivial, mas mostra como a regra de três pode ser aplicada mesmo em situações aparentemente simples.</p>

<h3>Exemplo prático: Velocidade constante</h3>

<p>Um ciclista leva 2 horas para percorrer 30 km. Qual a velocidade média em km/h?</p>

<p><strong>Cálculo:</strong></p>
<p>3 horas → 180 km</p>
<p>1 hora → X km</p>

<p>X = 180 / 3 = 60 km/h</p>

<p>Este é um caso direto de velocidade = distância/tempo.</p>

<h3>Regra prática para montar a proporção</h3>

<p>Uma dica importante: sempre coloque os valores da mesma grandeza na mesma coluna. No exemplo do combustível:</p>

<p>Distância | Consumo</p>
<p>120 km | 8 litros</p>
<p>300 km | X litros</p>

<p>Isso ajuda a visualizar que estamos comparando distâncias com distâncias e consumos com consumos.</p>

<h2>Regra de três composta</h2>

<p>A regra de três composta é mais complexa e envolve três grandezas relacionadas. Ela é utilizada quando precisamos considerar múltiplas variáveis simultaneamente. É como uma regra de três simples, mas aplicada a uma situação com mais fatores.</p>

<h3>Quando usar a regra de três composta</h3>

<p>A regra de três composta é necessária quando:</p>

<ul>
<li>Há três variáveis relacionadas</li>
<li>Todas são diretamente proporcionais</li>
<li>Precisamos encontrar uma quarta variável</li>
</ul>

<p>Por exemplo: se sabemos quantas horas uma equipe trabalha por dia, quantas pessoas há na equipe e quanto elas produzem, podemos calcular a produção para diferentes cenários.</p>

<h3>Estrutura da regra de três composta</h3>

<p>A estrutura básica é:</p>

<p>Valor A → Valor B → Valor C</p>
<p>Valor D → Valor E → Valor X</p>

<p>Ou, em forma de proporção:</p>

<p>A/B/C = D/E/X</p>

<p>A resolução se dá por:</p>

<p>X = (C × D × E) / (A × B)</p>

<h3>Exemplo prático: Produção industrial</h3>

<p>Uma fábrica produz 500 peças por dia com 10 máquinas funcionando por 8 horas cada. Quantas peças serão produzidas se utilizarmos 15 máquinas por 6 horas cada?</p>

<p><strong>Passo 1:</strong> Identificar as grandezas</p>
<p>Máquinas, horas e produção são diretamente proporcionais.</p>

<p><strong>Passo 2:</strong> Montar a proporção</p>
<p>10 máquinas → 8 horas → 500 peças</p>
<p>15 máquinas → 6 horas → X peças</p>

<p><strong>Passo 3:</strong> Aplicar a fórmula</p>
<p>X = (500 × 15 × 6) / (10 × 8)</p>

<p><strong>Passo 4:</strong> Calcular passo a passo</p>
<p>500 × 15 × 6 = 500 × 15 = 7.500; 7.500 × 6 = 45.000</p>
<p>10 × 8 = 80</p>
<p>45.000 / 80 = 562,5</p>

<p><strong>Resultado:</strong> 562,5 peças</p>

<p><strong>Verificação:</strong></p>
<p>Produção por máquina-hora: 500 / (10 × 8) = 500 / 80 = 6,25 peças por máquina-hora</p>
<p>Para 15 máquinas por 6 horas: 15 × 6 × 6,25 = 90 × 6,25 = 562,5 peças</p>

<h3>Exemplo prático: Consumo de energia</h3>

<p>Uma casa consome 300 kWh por mês com 4 pessoas e aparelhos totalizando 5.000 watts de potência. Quantos kWh consumirá uma casa com 6 pessoas e 7.000 watts de potência?</p>

<p><strong>Análise:</strong></p>
<p>Pessoas, potência e consumo são diretamente proporcionais.</p>

<p>4 pessoas → 5.000 watts → 300 kWh</p>
<p>6 pessoas → 7.000 watts → X kWh</p>

<p>X = (300 × 6 × 7.000) / (4 × 5.000)</p>

<p>Cálculo: 300 × 6 × 7.000 = 12.600.000</p>
<p>4 × 5.000 = 20.000</p>
<p>X = 12.600.000 / 20.000 = 630 kWh</p>

<h3>Limitações da regra de três composta</h3>

<p>A regra de três composta assume que todas as variáveis são diretamente proporcionais e que não há fatores externos influenciando. Na vida real, isso nem sempre é verdade. Por exemplo:</p>

<ul>
<li>Economias de escala podem reduzir custos unitários</li>
<li>Fatores externos como inflação afetam preços</li>
<li>Desperdícios podem alterar proporções</li>
</ul>

<p>Sempre considere se a situação real permite essa simplificação matemática.</p>

<h2>Relação com porcentagem</h2>

<p>A regra de três e a porcentagem estão intimamente relacionadas, pois ambas lidam com proporções e razões. Na verdade, a porcentagem pode ser vista como um caso especial da regra de três.</p>

<h3>Porcentagem como regra de três</h3>

<p>Quando calculamos "X% de Y", estamos aplicando uma regra de três:</p>

<p>100% → Y</p>
<p>X% → Z</p>

<p>Logo: Z = (Y × X) / 100</p>

<p><strong>Exemplo:</strong> 15% de R$ 200</p>

<p>100% → R$ 200</p>
<p>15% → X</p>

<p>X = (200 × 15) / 100 = R$ 30</p>

<p>Esta é exatamente a fórmula básica da porcentagem que vimos no <a href="/conhecimento/porcentagem">artigo sobre porcentagem</a>.</p>

<h3>Regra de três como porcentagem</h3>

<p>Inversamente, podemos resolver problemas de regra de três usando conceitos de porcentagem.</p>

<p><strong>Exemplo:</strong> Um carro consome 8L para 120km, quanto para 300km?</p>

<p>Método 1 (regra de três): X = (8 × 300) / 120 = 20L</p>

<p>Método 2 (porcentagem): 300km é 250% de 120km, consumo = 8 × 2,5 = 20L</p>

<p>Ambos chegam ao mesmo resultado, mostrando a conexão entre os conceitos.</p>

<h2>Exemplos práticos no dia a dia</h2>

<p>A regra de três aparece em diversas situações cotidianas. Vamos explorar alguns exemplos práticos com cálculos reais.</p>

<h3>Exemplo 1: Receita de bolo</h3>

<p>Uma receita para 8 porções usa 2 xícaras de farinha. Quantas xícaras para 12 porções?</p>

<p>8 porções → 2 xícaras</p>
<p>12 porções → X xícaras</p>

<p>X = (2 × 12) / 8 = 24 / 8 = 3 xícaras</p>

<h3>Exemplo 2: Velocidade média em viagem</h3>

<p>Você dirige 180 km em 3 horas. Qual velocidade média?</p>

<p>3 horas → 180 km</p>
<p>1 hora → X km</p>

<p>X = 180 / 3 = 60 km/h</p>

<p>Extensão: Quanto tempo para 240 km à mesma velocidade?</p>

<p>60 km/h → 1 hora</p>
<p>240 km → X horas</p>

<p>X = 240 / 60 = 4 horas</p>

<h3>Exemplo 3: Consumo de combustível</h3>

<p>Seu carro faz 12 km por litro. Quantos litros para 480 km?</p>

<p>12 km → 1 litro</p>
<p>480 km → X litros</p>

<p>X = 480 / 12 = 40 litros</p>

<p>Custo: R$ 5,50/L = R$ 220</p>

<h3>Exemplo 4: Cálculo de salário</h3>

<p>Trabalha 40 horas/semana por R$ 2.400. Qual valor por hora?</p>

<p>40 horas → R$ 2.400</p>
<p>1 hora → X</p>

<p>X = 2.400 / 40 = R$ 60/hora</p>

<h3>Exemplo 5: Diluição de produtos</h3>

<p>Produto concentrado diluído 1:10. Quantos ml de água para 50 ml de concentrado?</p>

<p>1 parte concentrado → 10 partes água</p>
<p>50 partes concentrado → X partes água</p>

<p>X = (10 × 50) / 1 = 500 ml água</p>

<p>Volume total: 550 ml</p>

<h3>Exemplo 6: Pintura de parede</h3>

<p>1 litro pinta 8 m². Quantos litros para 120 m²?</p>

<p>8 m² → 1 litro</p>
<p>120 m² → X litros</p>

<p>X = 120 / 8 = 15 litros</p>

<h2>Erros comuns ao usar regra de três</h2>

<p>A regra de três é aparentemente simples, mas muitos erros ocorrem por falta de atenção aos detalhes.</p>

<h3>Erro 1: Inverter a proporção</h3>

<p>O erro mais comum é colocar os valores na ordem errada.</p>

<p><strong>Exemplo incorreto:</strong> Carro faz 12 km/L. Consumo para 100 km?</p>

<p>Proporção errada: 12 km → 1L; 100 km → X L</p>
<p>Resultado errado: X = 100 / 12 ≈ 8,33 L</p>

<p><strong>Correto:</strong> 12 km → 1L; 100 km → X L</p>
<p>X = 100 / 12 ≈ 8,33 L</p>

<p>Sempre pense na relação real entre as grandezas.</p>

<h3>Erro 2: Confundir proporcionalidade direta e inversa</h3>

<p>Muitos problemas envolvem proporcionalidade inversa.</p>

<p><strong>Exemplo:</strong> Carro leva 2h para 120km. Tempo para 240km?</p>

<p>Direta: 120km → 2h; 240km → X h</p>
<p>X = (2 × 240) / 120 = 4h</p>

<p>Inversa para velocidade constante: mais distância = mais tempo</p>

<p>Sempre identifique o tipo correto de proporcionalidade.</p>

<h3>Erro 3: Não considerar unidades</h3>

<p>Problemas com unidades diferentes levam a erros graves.</p>

<p>Sempre verifique consistência de unidades na proporção.</p>

<h3>Erro 4: Aplicar onde não é apropriado</h3>

<p>A regra de três assume proporcionalidade linear. Use apenas quando válida.</p>

<h3>Erro 5: Erros aritméticos</h3>

<p>Erros de multiplicação/divisão podem invalidar resultados.</p>

<p>Sempre faça cálculos passo a passo e verifique.</p>

<h3>Erro 6: Ignorar fatores externos</h3>

<p>Fatores como economia de escala ou condições externas podem alterar proporções.</p>

<p>Use a regra de três para estimativas, mas considere contexto real.</p>'''

new_article = {
    'slug': 'regra-de-tres',
    'title': 'Regra de Três: Como Calcular, Tipos e Aplicações Práticas',
    'category': 'matematica',
    'meta_title': 'Regra de Três: Como Calcular, Exemplos Práticos e Aplicações | CalcuLabs',
    'meta_description': 'Aprenda regra de três simples e composta: fórmulas, exemplos práticos, aplicações no dia a dia e erros comuns. Guia completo com exercícios resolvidos.',
    'search_intent': 'informacional',
    'summary': 'A regra de três é uma ferramenta matemática essencial para resolver problemas de proporcionalidade. Neste guia completo, você aprenderá os tipos de regra de três, como aplicá-la corretamente, verá exemplos práticos do cotidiano e entenderá sua relação com porcentagem. Domine esse conceito fundamental da matemática básica com explicações claras e exercícios resolvidos.',
    'content': content,
    'faq': [
        {
            'q': 'O que é a regra de três?',
            'a': 'É um método matemático para encontrar um valor desconhecido baseado na proporcionalidade entre três valores conhecidos. Ela estabelece que se duas grandezas são proporcionais, a razão entre elas permanece constante.'
        },
        {
            'q': 'Qual a diferença entre regra de três simples e composta?',
            'a': 'A simples envolve duas grandezas (ex: distância/consumo). A composta envolve três grandezas relacionadas simultaneamente (ex: máquinas/horas/produção).'
        },
        {
            'q': 'Como montar uma regra de três?',
            'a': 'Identifique grandezas proporcionais, coloque valores na mesma coluna, escreva A/B = C/X, multiplique cruzado: X = (B × C) / A.'
        },
        {
            'q': 'Quando usar proporcionalidade direta ou inversa?',
            'a': 'Direta quando aumento de uma aumenta a outra (ex: mais distância = mais combustível). Inversa quando aumento de uma diminui a outra (ex: mais velocidade = menos tempo).'
        },
        {
            'q': 'A regra de três funciona sempre?',
            'a': 'Não. Assume proporcionalidade linear e ignora fatores externos. Use apenas quando a proporcionalidade for realmente válida na situação prática.'
        },
        {
            'q': 'Como conectar regra de três com porcentagem?',
            'a': 'A porcentagem é caso especial da regra de três. Calcular X% de Y é: 100% → Y; X% → resultado. Fórmula X = (Y × X) / 100 é idêntica.'
        }
    ],
    'how_to': [
        'Identifique grandezas proporcionais e tipo de proporcionalidade (direta/inversa)',
        'Monte proporção com valores da mesma grandeza na mesma coluna',
        'Escreva equação A/B = C/X ou X = (B × C) / A',
        'Resolva multiplicando cruzado',
        'Verifique se resultado faz sentido na situação prática'
    ],
    'entities': [
        'regra de três',
        'proporcionalidade direta',
        'proporcionalidade inversa',
        'regra de três simples',
        'regra de três composta',
        'razão',
        'proporção'
    ],
    'semantic_keywords': [
        'regra de três simples',
        'regra de três composta',
        'como fazer regra de três',
        'exemplos regra de três',
        'proporcionalidade direta',
        'proporcionalidade inversa',
        'regra de três matemática'
    ],
    'examples': [
        'Carro consome 8L para 120km, quanto para 300km? Resposta: 20L (X = 8 × 300 / 120)',
        '15 máquinas produzem 500 peças em 8h, quantas 12 máquinas produzem em 6h? Resposta: 375 peças',
        'Salário R$ 2.400 para 40h, quanto por hora? Resposta: R$ 60/h'
    ],
    'comparisons': [
        'Regra de três simples: duas grandezas vs composta: três grandezas',
        'Proporcionalidade direta (mais carros = mais gasolina) vs inversa (mais carros = menos gasolina por carro)'
    ],
    'related_calculators': [
        'juros-simples',
        'juros-compostos'
    ],
    'related_articles': [
        'porcentagem',
        'variacao-percentual'
    ],
    'internal_links': [
        'porcentagem',
        'variacao-percentual'
    ],
    'featured_snippet_answer': 'Regra de três encontra valor desconhecido através de proporcionalidade: se A está para B assim como C está para X, então X = (B × C) / A. Para direta: valores aumentam juntos; inversa: um aumenta quando outro diminui.',
    'priority': 'high',
    'cluster': {
        'is_pillar': False,
        'cluster_name': 'matematica-basica',
        'satellites': []
    },
    'publishedAt': '2026-04-08'
}

data.append(new_article)

with open(r'C:\Users\fabio\OneDrive\Documentos\Calculabs\Calculabs-Dev\calculabs\src\data\articles.json', 'w', encoding='utf-8') as f:
    json.dump(data, f, ensure_ascii=False, indent=2)

print('Article added to JSON successfully')
