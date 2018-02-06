import Wellcome from '../views/Wellcome.vue'
import NotFound from '../views/404.vue'
import Home from '../views/Home.vue'

/**个人中心 **
**name:wp**
**date:2017/12/20*/
import personalCenter from 'views/personalCenter/personalCenter.vue'
/**个人中心 end**/

/**信息管理 **
**name:wp**
**date:2017/12/18*/
//信息管理
import informationManagement from 'views/contentManger/informationManagement.vue'
/**信息管理 end**/

/**请假管理 **
**name:wp**
**date:2017/12/20*/
//请假管理首页
import leaveManager from 'views/leaveManager/leaveManager.vue'
/**内容管理 end**/

/**人事管理 **
**name:wp**
**date:2017/12/20*/
//请假管理首页
import personnelManager from 'views/personnelManager/personnelManager.vue'
/**人事管理 end**/

/**事务管理 **
**name:wp**
**date:2017/12/20*/
//请假管理首页
import transactionManager from 'views/transactionManager/transactionManager.vue'
/**事务管理 end**/


/*课务管理*/
import classManager from '../views/classManager/main.vue'
/*在线作业*/
import studentHomeWork from '../views/studentHomeWork/main.vue'
/*成绩管理*/
import achievementManager from '../views/achievement/main.vue'


/*家校通*/
import FamilySchool from '../views/fs-module/family-school.vue'
/*学生管理*/
import StudentManage from '../views/student-manage/student-manage.vue'
/*选课管理*/
import ChoiceCourse from '../views/choice-course/choice-course-manage.vue'
/*在线选课*/
import OnlineChoiceCourse from '../views/online-choice-course/online-choice-manage.vue'


/*校园总务*/
import SchoolAffair from "../views/schoolAffair/SchoolAffair.vue";
/*系统设置*/
import SystemSet from "../views/systemSet/SystemSet.vue";
import SubjectSchedule from  "../views/subjectSchedule/SubjectSchedule.vue"//课表管理


let routes = [
    {
        path: '/index',
        component: Wellcome,
        name: '',
        hidden: true
    },
    {
        path: '/404',
        component: NotFound,
        name: '',
        hidden: true
    },

    /*梁伟*/
    {
        path: '/',
        component: Home,
        name: '',
        menuId: 1,
        iconImg: 'fa fa-home',
        leaf: true,
        children: [
            { path: '/personal-center', component: personalCenter, name: '个人中心' },
        ]
    },
    {
        path: '/',
        component: Home,
        name: '',
        menuId: 12,
        iconImg: 'fa fa-users',
        leaf: true,
        children: [
             { path: '/personnelManager', component: personnelManager, name: '人事管理' }
        ]
    },
    {
        path: '/',
        component: Home,
        name: '',
        menuId: 11,
        iconImg: 'fa fa-book',
        leaf: true,
        children: [
             { path: '/information-management', component: informationManagement, name: '文档管理' }
        ]
    },
	{
        path: '/',
        component: Home,
        name: '',
        menuId: 13,
        iconImg: 'fa fa-briefcase',
        leaf: true,//只有一个节点
        children: [
             { path: '/transactionManager', component: transactionManager, name: '事务管理' }
        ]
    },

    /*唐启涛*/
    {
        path: '/',
        component: Home,
        name: '',
        menuId: 5,
        iconImg: 'fa fa-phone-square',
        leaf: true,
        children: [
            { path: '/family-school', component: FamilySchool, name: '家校通' },
        ]
    },
    {
        path: '/',
        component: Home,
        name: '',
        menuId: 2,
        iconImg: 'fa fa-child',
        leaf: true,
        children: [
            { 
                path: '/student-manage', 
                component: StudentManage, 
                name: '学生管理',
                children: [
                    { 
                        path: '/', 
                        redirect: 'enroll'
                    },
                    { 
                        path: 'enroll', 
                        name: 'enroll', 
                        component: (resolve) => {require(['@/views/student-manage/enrollment-manage.vue'], resolve)}
                    },
                    { 
                        path: 'credit', 
                        name: 'credit', 
                        component: (resolve) => {require(['@/views/student-manage/credit-manage.vue'], resolve)}
                    },
                    { 
                        path: 'score', 
                        name: 'score', 
                        component: (resolve) => {require(['@/views/student-manage/score-file.vue'], resolve)}
                    },
                    { 
                        path: 'health', 
                        name: 'health', 
                        component: (resolve) => {require(['@/views/student-manage/health-file.vue'], resolve)}
                    },
                    { 
                        path: 'school', 
                        name: 'school', 
                        component: (resolve) => {require(['@/views/student-manage/io-school.vue'], resolve)}
                    },
                    { 
                        path: 'card', 
                        name: 'card', 
                        component: (resolve) => {require(['@/views/student-manage/ICcard-record.vue'], resolve)}
                    },
                ]
            },

        ]
    },
    {
        path: '/',
        component: Home,
        name: '',
        menuId: 7,
        iconImg: 'fa fa-window-restore',
        leaf: true,
        children: [
            { 
                path: '/choice-course-manage',
                component: ChoiceCourse,
                name: '选课管理',
                children: [
                    { 
                        path: '/', 
                        redirect: 'launch'
                    },
                    { 
                        path: 'launch', 
                        name: 'launch', 
                        component: (resolve) => {require(['@/views/choice-course/launch-choice.vue'], resolve)}
                    },
                    { 
                        path: 'primary', 
                        name: 'primary', 
                        component: (resolve) => {require(['@/views/choice-course/primary-choice.vue'], resolve)}
                    },
                    { 
                        path: 'adjust', 
                        name: 'adjust', 
                        component: (resolve) => {require(['@/views/choice-course/adjust-choice.vue'], resolve)}
                    },
                    { 
                        path: 'divide', 
                        name: 'divide', 
                        component: (resolve) => {require(['@/views/choice-course/divide-choice.vue'], resolve)}
                    }
                ]
            }

        ]
    },
    {
        path: '/',
        component: Home,
        name: '',
        menuId: 8,
        iconImg: 'fa fa-server',
        leaf: true,
        children: [
            { 
                path: '/online-choice-course',
                component: OnlineChoiceCourse,
                name: '在线选课',
                children: [
                    { 
                        path: '/', 
                        redirect: 'introduce'
                    },
                    { 
                        path: 'introduce', 
                        name: 'introduce', 
                        component: (resolve) => {require(['@/views/online-choice-course/introduce-choice.vue'], resolve)}
                    },
                    { 
                        path: 'join', 
                        name: 'join', 
                        component: (resolve) => {require(['@/views/online-choice-course/join-choice.vue'], resolve)}
                    },
                    { 
                        path: 'result', 
                        name: 'result', 
                        component: (resolve) => {require(['@/views/online-choice-course/result-choice.vue'], resolve)}
                    },
                    { 
                        path: 'tracked', 
                        name: 'tracked', 
                        component: (resolve) => {require(['@/views/online-choice-course/tracked-choice.vue'], resolve)}
                    }
                ]
            }

        ]
    },
    /*何宇轩*/
    {
        path: '/',
        component: Home,
        name: '',
        menuId: 3,
        iconImg: 'fa fa-pencil',
        leaf: true,
        children: [
            { path: '/class-manager', component: classManager, name: '课务管理' },

        ]
    },
    {
        path: '/',
        component: Home,
        name: '',
        menuId: 9,
        iconImg: 'fa fa-pencil',
        leaf: true,
        children: [
            { path: '/student-homeWork', component: studentHomeWork, name: '在线作业' },

        ]
    },
    {
        path: '/',
        component: Home,
        name: '',
        menuId: 6,
        iconImg: 'fa fa-list-ol',
        leaf: true,
        children: [
            { path: '/score-manage', component: achievementManager, name: '成绩管理' },

        ]
    },
    /*张雄*/
    {
        path: '/',
        component: Home,
        name: '',
        menuId: 4,
		iconImg: 'fa fa-laptop',
        leaf: true,
        children: [
            {
                path: '/subjectSchedule',
                component: SubjectSchedule,
                name: '课程安排',
                children:[
	                {
		                path: '/subjectSchedule',
		                redirect: '/subjectSchedule/subjectPlan'
	                },
                    {
                        path:"subjectPlan",
                        name:"subjectPlan",
	                    component:(resolve)=>{require(['@/views/subjectSchedule/subjectPlan/SubjectPlan.vue'], resolve)},
                    }
                ],
            }
        ]
    },
    {
        path: '/',
        component: Home,
        name: '',
        menuId: 15,
        iconImg: 'fa fa-archive',
        leaf: true,
        children: [
            {
                path: '/schoolAffair',
                component: SchoolAffair,
                name: '校园总务',
                children:[
                    {
                        path:"/schoolAffair",
                        redirect:"/schoolAffair/canteen",
                    },
                    {
                        path:"canteen",//食堂管理
                        name: 'canteen',
                        component: (resolve) => {require(['@/views/schoolAffair/canteen/canteen.vue'], resolve)},
                        children:[
                            {
                                path:"/schoolAffair/canteen",
                                redirect:"/schoolAffair/canteen/food",//菜品管理
                            },
                            {
                                path:"food",
                                name: 'food',
                                component: (resolve) => {require(['@/views/schoolAffair/canteen/food.vue'], resolve)},
                            },
                            {
                                path:"foodType",
                                name: 'foodType',
                                component: (resolve) => {require(['@/views/schoolAffair/canteen/foodType.vue'], resolve)},
                            },
                            {
                                path:"field",
                                name: 'field',
                                component: (resolve) => {require(['@/views/schoolAffair/canteen/field.vue'], resolve)},
                            }
                        ]
                    },
                    {
                        path:"store",//商店管理
                        name: 'store',
                        component: (resolve) => {require(['@/views/schoolAffair/store/store.vue'], resolve)},
                    },
                    {
                        path:"schoolAsset",//校产管理
                        name: 'schoolAsset',
                        component: (resolve) => {require(['@/views/schoolAffair/schoolAsset/schoolAsset.vue'], resolve)},
                        children:[
                            {
                                path:"/schoolAffair/schoolAsset",
                                redirect:"/schoolAffair/schoolAsset/supplier",//菜品管理
                            },
                            {
                                path:"supplier",
                                name: 'supplier',
                                component: (resolve) => {require(['@/views/schoolAffair/schoolAsset/supplier/_supplier.vue'], resolve)},
                            },
                            {
                                path:"asset",
                                name: 'asset',
                                component: (resolve) => {require(['@/views/schoolAffair/schoolAsset/asset/asset.vue'], resolve)},
                            }
                        ]
                    },
                    {
                        path:"vehicle",//车辆管理
                        name: 'vehicle',
                        component: (resolve) => {require(['@/views/schoolAffair/vehicle/vehicle.vue'], resolve)},
                    },
                    {
                        path:"myAsset",//我的资产
                        name: 'myAsset',
                        component: (resolve) => {require(['@/views/schoolAffair/myAsset/MyAsset.vue'], resolve)},
                    }
                ]
            }
        ]
    },
    {
        path: '/',
        component: Home,
        name: '',
        menuId: 23,
        iconImg: 'fa fa-cog',
        leaf: true,
        children: [
            {
                path: '/systemSet',
                component: SystemSet,
                name: "系统设置",
                children:[
                    {
                        path:"/systemSet",
                        redirect:"/systemSet/personRoleManage",//默认为人员角色管理
                    },
                    {
                        path:"personRoleManage",//人员角色管理
                        name: 'personRoleManage',
                        component: (resolve) => {require(['@/views/systemSet/personRoleManage/PersonRoleManage.vue'], resolve)},
                    },
                    {
                        path:"roleFunManage",//角色功能管理
                        name: 'roleFunManage',
                        component: (resolve) => {require(['@/views/systemSet/roleFunManage/RoleFunManage.vue'], resolve)},
                    },
                    {
                        path:"institution",//组织机构
                        name: 'institution',
                        component: (resolve) => {require(['@/views/systemSet/institution/Institution.vue'], resolve)},
                    },
                    {
                        path:"subjectManage",//学科管理
                        name: 'subjectManage',
                        component: (resolve) => {require(['@/views/systemSet/subjectManage/SubjectManage.vue'], resolve)},
                    },
                    {
                        path:"gradeManage",//年级管理
                        name: 'gradeManage',
                        component: (resolve) => {require(['@/views/systemSet/gradeManage/GradeManage.vue'], resolve)},
                    },
                    {
                        path:"classManage",//班级管理
                        name: 'classManage',
                        component: (resolve) => {require(['@/views/systemSet/classManage/ClazzManage.vue'], resolve)},
                    },
                    {
                        path:"studentManage",//班级学生管理
                        name: 'studentManage',
                        component: (resolve) => {require(['@/views/systemSet/studentManage/StuManage.vue'], resolve)},
                    },
                    {
                        path:"teacherManage",//班级教师管理
                        name: 'teacherManage',
                        component: (resolve) => {require(['@/views/systemSet/teacherManage/TeacherManage.vue'], resolve)},
                    },
                    {
                        path:"stuJobManage",//班级学生职务管理
                        name: 'stuJobManage',
                        component: (resolve) => {require(['@/views/systemSet/stuJobManage/StuJobManage.vue'], resolve)},
                    },
                    {
                        path:"baseInfo",//班级学生职务管理
                        name: 'baseInfo',
                        component: (resolve) => {require(['@/views/systemSet/baseInfo/baseInfo.vue'], resolve)},
                        children:[
                            {
                                path:"/systemSet/baseInfo",
                                redirect:"/systemSet/baseInfo/studentInfo",//默认为学科管理
                            },
                            {
                                path:"studentInfo",
                                name:"studentInfo",
                                component:(resolve)=>{require(["@/views/systemSet/baseInfo/studentInfo/studentInfo.vue"],resolve)},
                            },
                            {

                                path:"teacherInfo",
                                name:"teacherInfo",
                                component:(resolve)=>{require(["@/views/systemSet/baseInfo/teacherInfo/teacherInfo.vue"],resolve)},
                            },
                            {

                                path:"parentInfo",
                                name:"parentInfo",
                                component:(resolve)=>{require(["@/views/systemSet/baseInfo/parentInfo/parentInfo.vue"],resolve)},
                            }
                        ],
                    }
                ]
            }
        ]
    },


    {
        path: '/',
        component: Home,
        name: '',
        menuId: 10,
        iconImg: 'fa fa-credit-card',
        leaf: true,
        children: [
            { path: '/school-ic', name: '校园IC卡' },

        ]
    },
    {
        path: '/',
        component: Home,
        name: '',
        menuId: 19,
        iconImg: 'fa fa-sliders',
        leaf: true,
        children: [
            { path: '/count-analy', name: '统计分析' },

        ]
    },
    {
        path: '/',
        component: Home,
        name: '',
        menuId: 16,
        iconImg: 'fa fa-dollar',
        leaf: true,
        children: [
            { path: '/finance-manage', name: '财务管理' },

        ]
    },
    {
        path: '/',
        component: Home,
        name: '',
        menuId: 18,
        iconImg: 'fa fa-desktop',
        leaf: true,
        children: [
            { path: '/visibial-school', name: '可视化校园' },

        ]
    },
    
    {
        path: '/',
        component: Home,
        name: '',
        menuId: 17,
        iconImg: 'fa fa-cubes',
        leaf: true,
        children: [
            { path: '/course-file-store',  name: '课件平台' },

        ]
    },
    {
        path: '/',
        component: Home,
        name: '',
        menuId: 21,
        iconImg: 'fa fa-leaf',
        leaf: true,
        children: [
            { path: '/common-store', name: '公益平台' },

        ]
    },
    {
        path: '/',
        component: Home,
        name: '',
        menuId: 20,
        iconImg: 'fa fa-balance-scale',
        leaf: true,
        children: [
            { path: '/descision-analy', name: '决策分析' },
        ]
    },
    {
        path: '/',
        component: Home,
        name: '',
        menuId: 22,
        iconImg: 'fa fa-info-circle',
        leaf: true,
        children: [
            { path: '/thmem-page', name: '主题页' },
        ]
    },
    
    {
        path: '*',
        hidden: true,
        redirect: { path: '/404' }
    },
    {
        path: '/',
        component: Home,
        name: '',
        menuId: 14,
        iconImg: 'fa fa-map-signs',
        leaf: true,
        children: [
             { path: '/leave-manager', name: '请假管理' }
        ]
    }
];

export default routes;