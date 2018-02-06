<!--**文章管理 **
**name:wp**
**date:2017/12/18*-->
<template>
    <section class="tab_content-wrapper">
        <!--工具条-->
        <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
            <el-form :inline="true" :model="filters">
                <el-form-item>
                    <el-input v-model="filters.title" placeholder="请输入标题"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button v-on:click="handleQuery" icon="el-icon-search">查询</el-button>
                </el-form-item>
                <el-form-item>
                    <el-button @click="handleAdd" icon="el-icon-plus">新增</el-button>
                </el-form-item>
            </el-form>
        </el-col>
        <!--列表-->
        <el-table :max-height="maxHeight" stripe :data="listData" highlight-current-row v-loading="listLoading" style="width: 100%;">
            <el-table-column type="index" width="40" align="center" label="#">
            </el-table-column>
            <!--<el-table-column prop="categorydesc" label="文章分类" width="100" align="center">
            </el-table-column>-->
            <el-table-column prop="title" label="标题" align="center">
            </el-table-column>
            <el-table-column prop="abstract_" label="摘要" align="center">
            </el-table-column>
            <!--<el-table-column prop="abstract_pic" label="摘要图片" align="center" width="80">
                <template scope="scope">
                    <div class="brod">
                        <template v-if="scope.row.categoryid == 6">
                            <img :src="scope.row.abstract_pic" class="avatar">
                        </template>
                        <template v-else>
                            <img :src="'/img/'+scope.row.abstract_pic" class="avatar">
                        </template>
                    </div>
                </template>
            </el-table-column>-->
            <el-table-column prop="author" label="作者" align="center">
            </el-table-column>
            <el-table-column prop="releasedate" label="发布时间" align="center" :formatter="releasedateFormart">
            </el-table-column>
            <el-table-column label="操作" width="190" align="center">
                <template scope="scope">
                    <el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                    <el-button type="danger" size="small" @click="handleDel(scope.$index, scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>

        <!--工具条-->
        <el-col :span="24" class="toolbar ipmt5">
            <el-pagination @size-change="handleSizeChange" background @current-change="handleCurrentChange" :page-sizes="[15,20,30]" :page-size="pageSize" layout="total, sizes, prev, pager, next" :total="total" style="float:right;">
            </el-pagination>
        </el-col>

        <!--编辑界面-->
        <el-dialog title="编辑" append-to-body :visible.sync="editFormVisible" :close-on-click-modal="false">
            <el-form :model="editForm" label-width="80px" :rules="editFormRules" ref="editForm">
                <el-row :gutter="20">
                        <!--<el-col :span="12">
                            <el-form-item label="文章分类" prop="categorydesc">
                                <el-select v-model="editForm.categorydesc" @visible-change="categoryChange" :loading="categoryLoading" filterable placeholder="请选择文章分类" clearable>
                                    <el-option v-for="item in categoryTypeList" :key="item.name" :label="item.name" :value="item.id">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>-->
                        <el-col :span="24">
                            <el-form-item label="标题" prop="title">
                                <el-input v-model="editForm.title" auto-complete="off"></el-input>
                            </el-form-item>
                        </el-col>
                        <!--<el-col :span="24">
                            <el-form-item label="摘要图片" prop="abstract_pic">
                                <el-upload class="avatar-uploader" action="/vasms-web/atta/upload" :show-file-list="false" :accept="accept" name="mediaFile" list-type="picture-card" :on-success="headImgSuccess">
                                    <img v-if="imageUrl" :src="imageUrl" class="avatar">
                                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                                </el-upload>
                            </el-form-item>
                        </el-col>-->
                        <el-col :span="12">
                            <el-form-item label="发布时间" prop="releasedate">
                                <el-date-picker v-model="editForm.releasedate" type="date" placeholder="选择日期" :picker-options="pickerOptions">
                                </el-date-picker>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="作者" prop="author">
                                <el-input v-model="editForm.author" auto-complete="off"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="24">
                            <el-form-item label="摘要" prop="abstract_">
                                <el-input type="textarea" v-model="editForm.abstract_"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="24">
                            <el-form-item label="内容" prop="content">
                            	<quill-editor ref="editMyTextEditor"  
	                                :content="editForm.content"
	                                :options = "editorOption"  
	                                @change="editOnEditorChange($event)">
	                            </quill-editor> 
                                <!--<vueEditor2 ref="myTextEditor2" v-model="editForm.content"></vueEditor2>-->
                            </el-form-item>
                        </el-col>
                </el-row>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click.native="editFormVisible = false">取消</el-button>
                <el-button type="primary" @click.native="editSubmit" :loading="editLoading">提交</el-button>
            </div>
        </el-dialog>

        <!--新增界面-->
        <el-dialog title="新增" append-to-body :visible.sync="addFormVisible" :close-on-click-modal="false">
            <el-form :model="addForm" label-width="80px" :rules="addFormRules" ref="addForm">
                <el-row :gutter="20">
                        <!--<el-col :span="12">
                            <el-form-item label="文章分类" prop="categorydesc">
                                <el-select class="w100" v-model="addForm.categorydesc" @visible-change="categoryChange" :loading="categoryLoading" filterable placeholder="请选择文章分类" clearable>
                                    <el-option v-for="item in categoryTypeList" :key="item.name" :label="item.name" :value="item.id">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>-->
                        <el-col :span="24">
                            <el-form-item label="标题" prop="title">
                                <el-input v-model="addForm.title" placeholder="请输入标题" auto-complete="off"></el-input>
                            </el-form-item>
                        </el-col>
                        <!--<el-col :span="24">
                            <el-form-item label="摘要图片" prop="abstract_pic">
                                <el-upload class="avatar-uploader" action="/vasms-web/atta/upload" :show-file-list="false" :accept="accept" name="mediaFile" list-type="picture-card" :on-success="headImgSuccess">
                                    <img v-if="imageUrl" :src="imageUrl" class="avatar">
                                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                                </el-upload>
                            </el-form-item>
                        </el-col>-->
                        <el-col :span="12">
                            <el-form-item label="发布时间" class="w100" prop="releasedate">
                                <el-date-picker v-model="addForm.releasedate" type="date" placeholder="选择日期" :picker-options="pickerOptions">
                                </el-date-picker>
                            </el-form-item>
                        </el-col>

                        <el-col :span="12">
                            <el-form-item label="作者" prop="author">
                                <el-input v-model="addForm.author" placeholder="请输入作者" auto-complete="off"></el-input>
                            </el-form-item>
                        </el-col>

                         <el-col :span="24">
                            <el-form-item label="摘要" prop="abstract_">
                                <el-input type="textarea" placeholder="请输入摘要" v-model="addForm.abstract_"></el-input>
                            </el-form-item>
                        </el-col>

                        <el-col :span="24">
                            <el-form-item label="内容" prop="content">
                            	<quill-editor ref="addMyTextEditor"  
                            		placeholder="请输入标题"
	                                :content="addForm.content"
	                                :options = "editorOption"  
	                                @change="onEditorChange($event)">
	                            </quill-editor> 
                                <!--<vueEditor ref="myTextEditor" v-model="addForm.content"></vueEditor>-->
                            </el-form-item>
                        </el-col>
                </el-row>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click.native="addFormVisible = false">取消</el-button>
                <el-button type="primary" @click.native="addSubmit" :loading="addLoading">提交</el-button>
            </div>
        </el-dialog>
    </section>
</template>

<style type="text/css" scoped>
    div.brod {
        border-radius: 100%;
        width: 35px;
        height: 35px;
        overflow: hidden;
        margin: 2px auto;
    }
    
    div.brod img {
        width: 100%;
        height: 100%;
    }
    
    .el-upload--picture-card {
        overflow: hidden;
    }
</style>
<script>
	import { quillEditor } from 'vue-quill-editor';
	import 'quill/dist/quill.core.css';
	import 'quill/dist/quill.snow.css';
    import util from '../../common/js/util';
    import { getArtcileList, addArtcile, modifyArtcile, removeArtcile } from '../../api/wp_api';
    export default {
    	props:['activeName'],
        components: {
            quillEditor
        },
        data() {
            return {
            	editorOption:{
     			},
                maxHeight:0,
                filters: {
                    title:''
                },
                pickerOptions: { //日期
                    disabledDate(time) {
                        return time.getTime() < Date.now() - 8.64e7;
                    }
                },
                listData: [],
                total: 0,
                currentPage: 1,
                pageSize: 15,
                listLoading: false,
                editFormVisible: false, //编辑界面是否显示
                editLoading: false,
                categoryTypeList: [], //文章类型
                categoryLoading: false,
                imageUrl: '', //头像
                accept: '.jpg,.png,.jpeg',
                editFormRules: {
                	title: [
			            { required: true, message: '请输入标题', trigger: 'blur' }
			        ],
			        releasedate: [
			            { required: true, type:'date', message: '请选择发布日期', trigger: 'blur' }
			        ],
			        author: [
			            { required: true, message: '请输入作者', trigger: 'blur' }
			        ],
			        abstract_: [
			            { required: true, message: '请输入摘要', trigger: 'blur' }
			        ],
                },
                //编辑界面数据
                editForm: {
                    highlightflag: '',
                    releasedate: '',
                    releaseby: '',
                    updatedate: '',
                    updateby: '',
                    id: '',
                    parentid: '',
                    // categoryid:'',
                    title: '',
                    abstract_: '',
                    abstract_pic: '',
                    content: '',
                    author: '',
                    isdelete: 0,
                    topflag: '',
                    showorder: 0,
                    categorydesc: '',
                },
                editFormId: {
                    categoryid: '',
                    categorydesc: '',
                },
                addFormVisible: false, //新增界面是否显示
                addLoading: false,
                addFormRules: {
					title: [
			            { required: true, message: '请输入标题', trigger: 'blur' }
			        ],
			        releasedate: [
			            { required: true, type:'date', message: '请选择发布日期', trigger: 'blur' }
			        ],
			        author: [
			            { required: true, message: '请输入作者', trigger: 'blur' }
			        ],
			        abstract_: [
			            { required: true, message: '请输入摘要', trigger: 'blur' }
			        ],
                },
                categoryType:'1',
                //新增界面数据
                addForm: {
                    highlightflag: '',
                    releasedate: '',
                    releaseby: '',
                    updatedate: '',
                    updateby: '',
                    parentid: '',
                    categoryid: '',
                    title: '',
                    abstract_: '',
                    abstract_pic: '',
                    content: '',
                    author: '',
                    isdelete: 0,
                    topflag: '',
                    showorder: 0,
                    categorydesc: '',
                }
            }
        },
        methods: {
        	releasedateFormart(row,i){
        		return util.formatDate.format(new Date(row.releasedate), 'yyyy-MM-dd');
        	},
        	onEditorChange(con){
        		this.addForm.content = con.html;
        	},
        	editOnEditorChange(con){
        		this.editForm.content = con.html;
        	},
            // 上传图片成功后
            headImgSuccess(res, file) {
                this.imageUrl = URL.createObjectURL(file.raw);
                this.editForm.abstract_pic = res;
                this.addForm.abstract_pic = res;
            },
            //切换当前页
            handleCurrentChange(val) {
                this.currentPage = val;
                this.handleQuery();
            },
            //切换每页显示数量
            handleSizeChange(val) {
                this.pageSize = val;
                this.handleQuery();
            },
            //获取文章列表
            handleQuery() {
                let para = {
                    // currentPage: this.currentPage,
                    // pageCount: this.pageSize,
                    title:this.filters.title,
                    'category.id':this.categoryType
                };
                this.listLoading = true;
                getArtcileList(para).then((res) => {
                    this.total = res.data.data.total;
                    this.listData = res.data.data.content;
                    this.listLoading = false;
                });
            },
            //删除
            handleDel(index, row) {
                this.$confirm('确认删除该记录吗?', '提示', {
                    type: 'warning'
                }).then(() => {
                    let para = {
                        id: row.id
                    };
                    removeArtcile(para).then((res) => {
                        this.$message({
                            message: '删除成功',
                            type: 'success'
                        });
                        this.handleQuery();
                    });
                }).catch(() => {

                });
            },
            //显示编辑界面
            handleEdit(index, row) {
                this.editFormVisible = true;
                this.editForm = row;
				this.editForm.releasedate = new Date(row.releasedate);
                let para = {
                    id: row.id,
                }
                
                if(row.category){
                    this.editFormId = {
                        categoryid: row.category.id,
                        categorydesc: row.category.name,
                    }
                    this.editForm.categorydesc =  row.category.name;
                }
                console.log(this.editForm.categorydesc,this.editForm)
                
                // 设置编辑时获取头像方式
                if(row.abstract_pic == undefined || row.abstract_pic == '') {
                    this.imageUrl = '';
                    return;
                }
                this.imageUrl = row.abstract_pic;
                
//              console.log(this.$refs,this.$refs.myTextEditor2)
//              this.$refs.myTextEditor2.ue.ready(function() {
//                  this.setContent(row.content);
//              });
            },
            //显示新增界面
            handleAdd() {
                this.addFormVisible = true;
                this.addForm = {
                    highlightflag: '',
                    releasedate: '',
                    releaseby: '',
                    updatedate: '',
                    updateby: '',
                    parentid: '',
                    categoryid: '',
                    title: '',
                    abstract_: '',
                    abstract_pic: '',
                    content: '',
                    author: '',
                    isdelete: 0,
                    topflag: '',
                    showorder: 0,
                    categorydesc: '',
                };
            },
            //编辑
            editSubmit() {
                this.$refs.editForm.validate((valid) => {
                    if(valid) {
                        this.editLoading = true;
                        let para = {
                            id: this.editForm.id,
                            title: this.editForm.title,
                            abstract_: this.editForm.abstract_,
//                          content: this.$refs.myTextEditor2.ue.getContent(),
							content:this.editForm.content,
                            author: this.editForm.author,
                            releasedate: this.editForm.releasedate,
                            abstract_pic: this.editForm.abstract_pic,
                            category:{id:this.categoryType}
                        }
                        if(this.editFormId.categorydesc == this.editForm.categorydesc) {
                            para.categoryid = this.editFormId.categoryid;
                        } else {
                            para.categoryid = this.editForm.categorydesc;
                        }
                        modifyArtcile(para).then((res) => {
                            this.editLoading = false;
                            this.$message({
                                message: '编辑成功',
                                type: 'success'
                            });
                            this.$refs['editForm'].resetFields();
                            this.editFormVisible = false;
                            this.handleQuery();
                        });
                    }
                });
            },
            //新增
            addSubmit() {
                this.$refs.addForm.validate((valid) => {
                    if(valid) {
                        this.addLoading = true;
                        let para = {
                            category:{id:this.categoryType},
                            title: this.addForm.title,
                            abstract_: this.addForm.abstract_,
                            abstract_pic: this.addForm.abstract_pic,
                            author: this.addForm.author,
//                          content: this.$refs.myTextEditor.ue.getContent(),
							content:this.addForm.content,
                            releasedate: this.addForm.releasedate,
                            isdelete: this.addForm.isdelete,
                        }
                        addArtcile(para).then((res) => {
                            this.addLoading = false;
                            this.$message({
                                message: '新增成功',
                                type: 'success'
                            });
                            this.$refs['addForm'].resetFields();
                            this.addFormVisible = false;
                            this.handleQuery();
                        });
                    }
                });
            }
        },
        created() {
            this.handleQuery();
            let wobj = util.getWindowWH();
            this.maxHeight = wobj.height - 240;
        }
    }
</script>