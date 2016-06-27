function asyncf(f){
    return function(...args){
        let it = f.apply(this, args);

        function next(p){
            if(!(p.done)){
                p.value.then(
                    (result => next(it.next(result))),
                    (exception => it.throw(exception)));
            }
        }
        next(it.next());
    };
}

function Timer(button){
    let paused = true;
    let queue = [];

    function toggle_pause(){
        paused = !paused;
        button.replaceChild(
            document.createTextNode(paused?"resume":"pause"),
            button.firstChild);
        button.className = paused?"paused":"";
        if(paused){
            queue = [];
        }else{
            for(let fun of queue) fun();
            queue = {"push": function(fun){fun();}};
        }
    }

    function sleep(t){
        return new Promise(
            function(resolve, reject){
                queue.push(
                    function(){
                        window.setTimeout(function(){queue.push(resolve)}, t);
                    }
                );
            }
        );
    }

    button.addEventListener("click", toggle_pause);
    return {sleep: sleep};
}

function fetch_image(filename){
    return new Promise(
        function(resolve, reject){
            let img = new Image();

            img.addEventListener(
                'load',
                function(){
                    let canvas = document.createElement('canvas');
                    canvas.width = img.width;
                    canvas.height = img.height;
                    let ctx = canvas.getContext("2d");
                    ctx.drawImage(img,0,0);
                    resolve(ctx);
                }
            );

            img.addEventListener(
                'error',
                function(event){
                    reject(event);
                }
            );

            img.src = filename;
        }
    );
}

function draw(array, n, width, height, scale){
    let bottom = array.reduce(function(a,b){return (a<b)?a:b;});
    let top = array.reduce(function(a,b){return (a>b)?a:b;});
    let length =  top - bottom;
    let size = width*height;

    let canvas_list =
        Array.from({length: n}).map(
            function(_,i){
                let canvas = document.createElement('canvas');
                canvas.width = width * scale;
                canvas.height = height * scale;
                let ctx = canvas.getContext("2d");

                let img = ctx.createImageData(canvas.width,canvas.height);
                let data = img.data;

                for(let y=0; y<height; y++){
                    for(let x=0; x<width; x++){
                        let v = (array[i*size+y*width+x]-bottom)/length*255;

                        for(let dy=0; dy<scale; dy++){
                            for(let dx=0; dx<scale; dx++){
                                let p = (((scale*y+dy)*width+x)*scale+dx) * 4;
                                data[p+0] = data[p+1] = data[p+2] = v;
                                data[p+3] = 255;
                            }
                        }
                    }
                }

                ctx.putImageData(img, 0, 0);
                return canvas;
            });
    return {min: bottom, max: top, canvas_list: canvas_list};
}

function create_layer(title, texts){
    let layer = document.createElement("fieldset");
    let legend = document.createElement("legend");
    legend.appendChild(document.createTextNode(title));
    layer.appendChild(legend);
    for(let text of texts){
        let p = document.createElement("p");
        p.appendChild(document.createTextNode(text));
        layer.appendChild(p);
    }
    return layer;
}

/* taken from convnetjs */
function f2t(x, d) {
    let dd = 1.0 * Math.pow(10, (d || 5));
    return '' + Math.floor(x*dd)/dd;
}

function add_activation(layer, title, array, groups, group_size, width, height, scale){
    let p = document.createElement("p");
    let h3 = document.createElement("h3");
    h3.appendChild(document.createTextNode(title));
    p.appendChild(h3);
    let result = draw(array, groups*group_size, width, height, scale);
    let max = document.createElement("span");
    let min = document.createElement("span");
    max.appendChild(document.createTextNode("max: "+ f2t(result.max)));
    min.appendChild(document.createTextNode("min: "+ f2t(result.min)));
    p.appendChild(max);
    p.appendChild(min);
    layer.appendChild(p);

    let activation = document.createElement("div");

    if(groups==1){
        for(let canvas of result.canvas_list)
            activation.appendChild(canvas);
    }else{
        for(let i=0; i<groups; i++){
            let group = document.createElement("div");
            group.className = "group";

            for(let j=0; j<group_size; j++){
                group.appendChild(result.canvas_list[i*group_size+j]);
            }
            activation.appendChild(group);
        }
    }

    layer.appendChild(activation);
}

function draw_activations(arrays){
    let id = "activation";
    let old_elem = document.getElementById(id);

    let new_elem = document.createElement("div");
    new_elem.id = id;

    let input = create_layer("input (24x24)", []);
    add_activation(input, "Activations:", arrays.Input, 1, 1, 24, 24, 2);
    add_activation(input, "Activations Gradients:", arrays.dInput, 1, 1, 24, 24, 2);
    new_elem.appendChild(input);

    let conv1 = create_layer("conv (8x24x24)", ["filter size 5x5", "parameters: 8x5x5+8 = 208"]);
    conv1.className = "conv";
    add_activation(conv1, "Activations:", arrays.Conv1, 1, 8, 24, 24, 2);
    add_activation(conv1, "Activations Gradients:", arrays.dConv1, 1, 8, 24, 24, 2);
    add_activation(conv1, "Weights:", arrays.K1, 8, 1, 5, 5, 2);
    add_activation(conv1, "Weights Gradients:", arrays.dK1, 8, 1, 5, 5, 2);
    new_elem.appendChild(conv1);

    let relu1 = create_layer("relu (8x24x24)", []);
    relu1.className = "relu";
    add_activation(relu1, "Activations:", arrays.Relu1, 1, 8, 24, 24, 2);
    add_activation(relu1, "Activations Gradients:", arrays.dRelu1, 1, 8, 24, 24, 2);
    new_elem.appendChild(relu1);

    let pool1 = create_layer("pool (8x12x12)", ["pooling size 2x2, stride 2"]);
    pool1.className = "pool";
    add_activation(pool1, "Activations:", arrays.Pool1, 1, 8, 12, 12, 2);
    add_activation(pool1, "Activations Gradients:", arrays.dPool1, 1, 8, 12, 12, 2);
    new_elem.appendChild(pool1);

    let conv2 = create_layer("conv (16x12x12)", ["filter size 8x5x5", "parameters: 16x8x5x5+16 = 3216"]);
    conv2.className = "conv";
    add_activation(conv2, "Activations:", arrays.Conv2, 1, 16, 12, 12, 2);
    add_activation(conv2, "Activations Gradients:", arrays.dConv2, 1, 16, 12, 12, 2);
    add_activation(conv2, "Weights:", arrays.K2, 16, 8, 5, 5, 2);
    add_activation(conv2, "Weights Gradients:", arrays.dK2, 16, 8, 5, 5, 2);
    new_elem.appendChild(conv2);

    let relu2 = create_layer("relu (16x12x12)", []);
    relu2.className = "relu";
    add_activation(relu2, "Activations:", arrays.Relu2, 1, 16, 12, 12, 2);
    add_activation(relu2, "Activations Gradients:", arrays.dRelu2, 1, 16, 12, 12, 2);
    new_elem.appendChild(relu2);

    let pool2 = create_layer("pool (16x4x4)", ["pooling size 3x3, stride 3"]);
    pool2.className = "pool";
    add_activation(pool2, "Activations:", arrays.Pool2, 1, 16, 4, 4, 2);
    add_activation(pool2, "Activations Gradients:", arrays.dPool2, 1, 16, 4, 4, 2);
    new_elem.appendChild(pool2);

    let fc = create_layer("fc (10)", ["parameters: 10x256+10 = 2570"]);
    fc.className = "fc";
    add_activation(fc, "Activations:", arrays.FC, 1, 10, 1, 1, 10);
    add_activation(fc, "Activations Gradients:", arrays.dFC, 1, 10, 1, 1, 10);
    new_elem.appendChild(fc);

    let sm = create_layer("softmax (10)", []);
    sm.className = "softmax";
    add_activation(sm, "Activations:", arrays.Output, 1, 10, 1, 1, 10);
    new_elem.appendChild(sm);

    let target = create_layer("target (10)", []);
    target.className = "softmax";
    add_activation(target, "Activations:", arrays.Target, 1, 10, 1, 1, 10);
    new_elem.appendChild(target);

    old_elem.parentNode.replaceChild(new_elem, old_elem);
}

/* taken from python */
let gauss = (function(){
    let next_z = null;

    return function(mu, sigma){
        let z;
        if(next_z === null){
            let x2pi = Math.random() * 2 * Math.PI;
            let g2rad = Math.sqrt(-2.0 * Math.log(1.0 - Math.random()));
            z = Math.cos(x2pi) * g2rad
            next_z = Math.sin(x2pi) * g2rad
        } else {
            z = next_z;
            next_z = null;
        }
        return mu+z*sigma;
    }
})();

function Samples(timer,start,end){
    let samples = [];
    let fetch_interval = 60*1000;
    let retry_interval = 10*1000;
    let queue = [];

    function randint(n){
        return Math.floor(Math.random()*n);
    }

    function pick(array){
        return [randint(samples.length), randint(3000)];
    }

    function copy_input(choice,array){
        let sample = samples[choice[0]].getImageData(0,choice[1],784,1);
        let canvas = document.createElement('canvas');
        canvas.width = 28;
        canvas.height = 28;
        let ctx = canvas.getContext('2d');
        let buf = ctx.createImageData(canvas.width, canvas.height);
        buf.data.set(sample.data);
        ctx.putImageData(buf, 0, 0);
        let img = ctx.getImageData(randint(4),randint(4),24,24);
        for(let i=0;i<576;i++) array[i]=img.data[i*4]/255.0;
    }

    function copy_target(choice,array){
        array.fill(0.0);
        array[labels[(choice[0]+start)*3000+choice[1]]]=1.0;
    }

    function get_target(choice){
        return labels[(choice[0]+start)*3000+choice[1]];
    }

    asyncf(
        function*(){
            for(let i=start; i<end; ++i){
                while(true){
                    try{
                        let img = yield fetch_image("img/mnist_batch_" + i + ".png");
                        samples.push(img);
                        for(let fun of queue) fun(i);
                        break;
                    }catch(e){
                        yield timer.sleep(retry_interval);
                    }
                }
                yield timer.sleep(fetch_interval);
            }
        }
    )();

    function wait(n){
        return new Promise(
            function(resolve, reject){
                if (samples.length >= n){
                    resolve();
                }else{
                    queue.push(
                        function fun(i){
                            if (samples.length >= n){
                                resolve();
                                queue.splice(queue.indexOf(fun), 1);
                            }
                        }
                    );
                }
            }
        );
    }

    function on_progress(f){
        if(samples.length) f(samples.length);
        queue.push(function(i){
            f(i-start+1);
        });
    }

    return {
        pick: pick,
        copy_input: copy_input,
        copy_target: copy_target,
        get_target: get_target,
        wait: wait,
        on_progress: on_progress,
    };
}


function fill_gauss(array, mu, sigma){
    for(let i=0;i<array.length;i++){
        array[i] = gauss(mu, sigma);
    }
}

function is_correct(output, label){
    let max = output.reduce(function(a,b){return (a>b)?a:b;});
    return (max >= 0.7) && (output[label] == max);
}

function Graph(){
    function Window(n){
        let i = 0;
        let buffer = new Array(n);
        let count = 0;
        let sum = 0;

        function add(elem){
            let old_elem = buffer[i];
            buffer[i] = elem;
            sum += elem - (old_elem || 0);
            i = (i+1) % n;
            if (count < n)
                count += 1;
            return sum/count;
        }

        return {add: add};
    }

    function Points(n, window_size){
        this.n = n;
        this.window = Window(window_size);
        this.buffer = [];
        this.next = 0;
        this.prev = null;
    }

    Points.prototype.add = function(elem){
        let current = [this.next, this.window.add(elem)];
        if(this.prev){
            this.buffer.push([this.prev, current]);
        }
        this.prev = current;
        this.next += 1;
        if(this.buffer.length>this.n) this.buffer.shift();
    }

    Points.prototype.get_data = function(){
        if (this.next < this.n){
            return this.buffer.slice(0, this.next);
        }
        return this.buffer;
    }

    function round_down(a,b){
        return Math.floor(a/b)*b;
    }

    function round_up(a,b){
        return Math.ceil(a/b)*b;
    }

    let size = 500;
    let loss = new Points(size, 20);
    let accuracy = new Points(size, 100);
    let width = 600;
    let height = 400;
    let padding = 40;

    let x_scale = d3.scale.linear().range([padding, width-padding]);
    let loss_scale = d3.scale.linear().range([height-padding, padding]);
    let accuracy_scale = d3.scale.linear().range([height-padding, padding]);

    d3.select("#graph").append("svg:svg").attr("width", width).attr("height", height);
    let last_x_domain = [null,null];
    let last_loss_domain = [null,null];
    let last_accuracy_domain = [null,null];

    function update_x_domain(){
        let next = loss.next;
        let x_domain = [(next<size)?0:round_down(next-size,size/10), (next<size)?size+20:round_up(next,size/10)];

        if(!((x_domain[0] == last_x_domain[0])&&(x_domain[1] == last_x_domain[1]))){
            x_scale.domain(x_domain);
            last_x_domain = x_domain;
            return true;
        }

        return false;
    }

    function update_loss_domain(loss_data){
        let min = d3.min(loss_data, function(d){return Math.min(d[0][1], d[1][1]);});
        let max = d3.max(loss_data, function(d){return Math.max(d[0][1], d[1][1]);});
        let loss_domain = [ round_down(min,0.2), round_up(max,0.2)];

        if(!((loss_domain[0] == last_loss_domain[0])&&(loss_domain[1] == last_loss_domain[1]))){
            loss_scale.domain(loss_domain);
            last_loss_domain = loss_domain;
            return true;
        }

        return false;
    }

    function update_accuracy_domain(accuracy_data){
        let min = d3.min(accuracy_data, function(d){return Math.min(d[0][1], d[1][1]);});
        let max = d3.max(accuracy_data, function(d){return Math.max(d[0][1], d[1][1]);});
        let accuracy_domain = [ (round_down(min,0.1) * 100), (round_up(max,0.1) || 0.1)*100];

        if(!((accuracy_domain[0] == last_accuracy_domain[0])&&(accuracy_domain[1] == last_accuracy_domain[1]))){
            accuracy_scale.domain(accuracy_domain);
            last_accuracy_domain = accuracy_domain;
            return true;
        }

        return false;
    }

    function redraw(){
        let loss_data = loss.get_data();
        let accuracy_data = accuracy.get_data();
        let graph = d3.select("#graph svg");

        if(update_x_domain()){
            graph.selectAll("line.x").remove();
            graph.selectAll("text.x").remove();

            graph.selectAll("line.x")
                .data(x_scale.ticks(10))
                .enter()
                .append("svg:line")
                .attr("class", "x")
                .attr("x1", x_scale)
                .attr("x2", x_scale)
                .attr("y1", padding)
                .attr("y2", height-padding);

            graph.selectAll("text.x")
                .data(x_scale.ticks(5))
                .enter()
                .append("svg:text")
                .attr("class", "x")
                .attr("x", x_scale)
                .attr("y", height-padding)
                .attr("dy", "1em")
                .text(x_scale.tickFormat(3));
        }

        if(update_loss_domain(loss_data)){
            graph.selectAll("text.loss").remove();

            graph.selectAll("text.loss")
                .data(loss_scale.ticks(5))
                .enter()
                .append("svg:text")
                .attr("class", "loss")
                .attr("y", loss_scale)
                .attr("x", padding)
                .attr("dx", "-.25em")
                .text(loss_scale.tickFormat(3));
        }

        if(update_accuracy_domain(accuracy_data)){
            graph.selectAll("text.accuracy").remove();

            graph.selectAll("text.accuracy")
                .data(accuracy_scale.ticks(5))
                .enter()
                .append("svg:text")
                .attr("class", "accuracy")
                .attr("y", accuracy_scale)
                .attr("x", width-padding)
                .attr("dx", ".25em")
                .text(accuracy_scale.tickFormat(3));
        }

        let loss_lines =
            graph.selectAll("line.loss")
            .data(loss_data)
            .attr("x1", function(d) { return x_scale(d[0][0]); })
            .attr("x2", function(d) { return x_scale(d[1][0]); })
            .attr("y1", function(d) { return loss_scale(d[0][1]); })
            .attr("y2", function(d) { return loss_scale(d[1][1]); });

        loss_lines.enter()
            .append("svg:line")
            .attr("class", "loss")
            .attr("x1", function(d) { return x_scale(d[0][0]); })
            .attr("x2", function(d) { return x_scale(d[1][0]); })
            .attr("y1", function(d) { return loss_scale(d[0][1]); })
            .attr("y2", function(d) { return loss_scale(d[1][1]); });
        loss_lines.exit().remove();

        let accuracy_lines =
            graph.selectAll("line.accuracy")
            .data(accuracy_data)
            .attr("x1", function(d) { return x_scale(d[0][0]); })
            .attr("x2", function(d) { return x_scale(d[1][0]); })
            .attr("y1", function(d) { return accuracy_scale(d[0][1]*100); })
            .attr("y2", function(d) { return accuracy_scale(d[1][1]*100); });

        accuracy_lines.enter()
            .append("svg:line")
            .attr("class", "accuracy")
            .attr("x1", function(d) { return x_scale(d[0][0]); })
            .attr("x2", function(d) { return x_scale(d[1][0]); })
            .attr("y1", function(d) { return accuracy_scale(d[0][1]*100); })
            .attr("y2", function(d) { return accuracy_scale(d[1][1]*100); });
        accuracy_lines.exit().remove();

    }

    function add(a,b){
        loss.add(a);
        accuracy.add(b);
    }

    return {add: add, redraw: redraw};
}

function MNIST(){
    let timer = Timer(document.getElementById("pause"));
    let PARAMS = ["K1","B1","K2","B2","W","B"];
    let graph = Graph();

    function predict(model, samples){
        let id = "prediction";
        let old_elem = document.getElementById(id);

        let new_elem = document.createElement("div");
        new_elem.id = id;

        for(let i=0; i<50; i++){
            let choice = samples.pick();
            let target = samples.get_target(choice);

            let output = new Float32Array(10);
            output.fill(0.0);

            for(let j=0;j<4;j++){
                samples.copy_input(choice, model.arrays.Input);
                model.calc();
                for(let k=0; k<10; k++) output[k] += model.arrays.Output[k]/4;
                yield timer.sleep(0);
            }

            let indices = [0,1,2,3,4,5,6,7,8,9];
            indices.sort(function(a,b){ return output[b]-output[a]; });

            let predict_div = document.createElement('div');
            predict_div.className = "predict";
            predict_div.appendChild(draw(model.arrays.Input, 1, 24, 24, 2).canvas_list[0]);

            let div = document.createElement("div");

            for(let j=0;j<3;j++){
                let index = indices[j];
                let n_elem = document.createElement("div");
                n_elem.className = "pp";
                if (index == target){
                    n_elem.className += " selected";
                }
                n_elem.style = "width: " + Math.floor(output[index]*100) + "px;";
                n_elem.appendChild(document.createTextNode(""+indices[j]));

                div.appendChild(n_elem);
            }

            predict_div.appendChild(div);
            new_elem.appendChild(predict_div);
            yield timer.sleep(0);
        }

        old_elem.parentNode.replaceChild(new_elem, old_elem);
    }

    function train(grad, trainer, samples){
        let loss = 0.0;

        for(let name of PARAMS) grad.arrays["g"+name].fill(0.0);

        for(let i=0; i<20; ++i){
            let choice = samples.pick();
            samples.copy_input(choice,grad.arrays.Input);
            samples.copy_target(choice,grad.arrays.Target);
            grad.calc();

            graph.add(
                grad.arrays.Loss[0],
                is_correct(grad.arrays.Output, samples.get_target(choice)));

            for(let name of PARAMS) grad.arrays["g"+name].set(grad.arrays["ng"+name]);
            yield timer.sleep(0);
        }

        graph.redraw();

        for(let name of PARAMS){
            trainer.arrays[name].set(grad.arrays[name]);
            trainer.arrays["d"+name].set(grad.arrays["g"+name]);
        }

        trainer.calc();

        for(let name of PARAMS){
            trainer.arrays[name+"g0"].set(trainer.arrays[name+"g1"]);
            trainer.arrays[name+"s0"].set(trainer.arrays[name+"s1"]);
            grad.arrays[name].set(trainer.arrays["n"+name]);
        }
    }

    asyncf(
        function*(){
            let loaded_elem = document.getElementById("loaded");

            let training_samples = Samples(timer,0,20);
            training_samples.on_progress(
                function(n){
                    loaded_elem.replaceChild(
                        document.createTextNode("" + n + "/20 training sets loaded"),
                        loaded_elem.firstChild);
                    loaded_elem.style = "background-size: " + Math.floor(100-n*5) + "% 100%, 100% 100%;";
                }
            );

            let test_samples = Samples(timer,20,21);
            yield training_samples.wait(1);
            yield test_samples.wait(1);
            yield timer.sleep(0);

            let model = Model();
            let grad = Grad();
            let act = Act();
            let trainer = Trainer();

            fill_gauss(grad.arrays.K1, 0.0, Math.sqrt(1.0/25));
            fill_gauss(grad.arrays.K2, 0.0, Math.sqrt(1.0/200));
            fill_gauss(grad.arrays.W, 0.0, Math.sqrt(1.0/256));
            grad.arrays.B1.fill(0.0);
            grad.arrays.B2.fill(0.0);
            grad.arrays.B.fill(0.0);

            for(let name of PARAMS){
                trainer.arrays[name+"g0"].fill(0.0);
                trainer.arrays[name+"s0"].fill(0.0);
            }

            while(true){
                for(let name of PARAMS) model.arrays[name].set(grad.arrays[name]);
                yield *predict(model, test_samples);

                for(let i=0; i<10; ++i){
                    for(let name of PARAMS) act.arrays[name].set(grad.arrays[name]);
                    let choice = test_samples.pick();
                    test_samples.copy_input(choice,act.arrays.Input);
                    test_samples.copy_target(choice,act.arrays.Target);
                    act.calc();
                    draw_activations(act.arrays);

                    for(let j=0; j<5; ++j){
                        yield* train(grad, trainer, training_samples);
                        yield timer.sleep(200);
                    }
                }
            }
        })();
}

window.addEventListener('load', MNIST);
