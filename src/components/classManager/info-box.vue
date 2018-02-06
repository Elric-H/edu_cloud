<template>
    <div :class="active">
        <span class="info-box-icon" :style="this.color">
            <i :class="iconClass"></i>
        </span>
        <div class="info-box-content">
            <span class="info-box-text">
                <slot></slot>
            </span>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'infoBox',
        props: {
            bgcolor: {
                default:"#409EFF"
            },
            iconClass: {
                default:"fa fa-address-card-o"
            }
        },
        data() {
            return {
                color:"background-color:"+this.bgcolor,
                active:'info-box'
            }
        }
    }
</script>
<style scoped>
    .info-box {
    	cursor: pointer;
        display: block;
        height: 76px;
        background: #fff;
        width: 220px;
        box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
        border-radius: 2px;
        margin-bottom: 15px;
        border: 1px solid rgba(0, 0, 0, 0.1);
    }
    .info-box:hover {
        box-shadow: 2px 0 2px rgba(0,0,0,0.1), 0 -2px 2px rgba(0,0,0,0.1), 0 2px 2px rgba(0,0,0,0.1);
    }
    div.active{
        box-shadow: 2px 0 2px rgba(0,0,0,0.1), 0 -2px 2px rgba(0,0,0,0.1), 0 2px 2px rgba(0,0,0,0.1);
    }
    .info-box-icon {
        border-top-left-radius: 2px;
        border-top-right-radius: 0;
        border-bottom-right-radius: 0;
        border-bottom-left-radius: 2px;
        display: block;
        float: left;
        height: 76px;
        width: 76px;
        text-align: center;
        font-size: 35px;
        line-height: 76px;
        background: rgba(0,0,0,0.2);
        color:#fefefe;
    }
    .info-box-content {
        padding: 5px 10px;
        margin-left: 76px;
    }
    .info-box>.info-box-content>span {
        font-size: 16px;
        line-height: 76px;
        text-align: center;
        display: block;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
</style>