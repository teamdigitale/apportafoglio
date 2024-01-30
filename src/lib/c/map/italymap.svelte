<script>
// @ts-nocheck

import data from './regioni.json';
const regionBaseColor = "#007700";
const regionBaseTransparency = 0.5;

export let selectedRegions = [];
export let readOnly = false;

const selectRegion = (id) => {
    if(readOnly)return;
    if(selectedRegions.indexOf(id)===-1){
        selectedRegions.push(id);
        selectedRegions = selectedRegions;
    }else{
        selectedRegions.splice(selectedRegions.indexOf(id),1);
        selectedRegions = selectedRegions;
    }
}

</script>
<div id="italymap">
<figure>
<svg
   version="1.0"
   id="italia"
   viewBox="0 0 1200 1500"
   preserveAspectRatio="xMinYMax meet"
   >
  <g 
     style="display:inline"
     id="regioni">
        {#each data.regioni as r}
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <!-- svelte-ignore a11y-no-static-element-interactions -->
            <path class="region" fill={regionBaseColor}
                fill-opacity={regionBaseTransparency}
                stroke-opacity=1
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width= 1px
                stroke={regionBaseColor}
                d={r.path} id={r.id} 
                on:click={(id) => selectRegion(r.id)}
                class:selected={selectedRegions.indexOf(r.id) >-1 ?true:false}
                class:unselected={(selectedRegions.length>0&&selectedRegions.indexOf(r.id)===-1)?true:false}
            />
        {/each}
  </g>
</svg>
</figure>
</div>

<style>
    #italymap{
        width: 40%;
    }

    .region{
        cursor: pointer;
    }

    .region:hover{
        fill-opacity: 0.75
    }

    .selected{
        fill: chocolate;
        stroke-width: 2px;
        stroke: chocolate;
        -webkit-transform: perspective(15px) rotateX(15deg);
        transform: perspective(15px) rotateX(15deg);
    }

    .unselected{
        fill: grey;
        stroke-width: 0.5px;
        stroke: grey;
    }


</style>


