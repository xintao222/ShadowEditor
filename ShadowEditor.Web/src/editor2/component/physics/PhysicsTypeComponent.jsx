import { PropertyGrid, PropertyGroup, TextProperty, DisplayProperty, CheckBoxProperty, NumberProperty, IntegerProperty, SelectProperty, ButtonsProperty, Button } from '../../../third_party';

/**
 * 二次贝塞尔曲线组件
 * @author tengge / https://github.com/tengge1
 */
class PhysicsTypeComponent extends React.Component {
    constructor(props) {
        super(props);

        this.selected = null;

        this.state = {
            show: false,
            expanded: true,
            v0x: 0,
            v0y: 0,
            v0z: 0,
            v1x: 0,
            v1y: 0,
            v1z: 0,
            v2x: 0,
            v2y: 0,
            v2z: 0,
        };

        this.handleExpand = this.handleExpand.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    render() {
        const { show, expanded, v0x, v0y, v0z, v1x, v1y, v1z, v2x, v2y, v2z } = this.state;

        if (!show) {
            return null;
        }

        return <PropertyGroup title={L_QUADRATIC_BEZIER_CURVE} show={show} expanded={expanded} onExpand={this.handleExpand}>
            <NumberProperty label={'Point1 X'} name={'v0x'} value={v0x} onChange={this.handleChange}></NumberProperty>
            <NumberProperty label={'Point1 Y'} name={'v0y'} value={v0y} onChange={this.handleChange}></NumberProperty>
            <NumberProperty label={'Point1 Z'} name={'v0z'} value={v0z} onChange={this.handleChange}></NumberProperty>
            <NumberProperty label={'Point2 X'} name={'v1x'} value={v1x} onChange={this.handleChange}></NumberProperty>
            <NumberProperty label={'Point2 Y'} name={'v1y'} value={v1y} onChange={this.handleChange}></NumberProperty>
            <NumberProperty label={'Point2 Z'} name={'v1z'} value={v1z} onChange={this.handleChange}></NumberProperty>
            <NumberProperty label={'Point3 X'} name={'v2x'} value={v2x} onChange={this.handleChange}></NumberProperty>
            <NumberProperty label={'Point3 Y'} name={'v2y'} value={v2y} onChange={this.handleChange}></NumberProperty>
            <NumberProperty label={'Point3 Z'} name={'v2z'} value={v2z} onChange={this.handleChange}></NumberProperty>
        </PropertyGroup>;
    }

    componentDidMount() {
        app.on(`objectSelected.PhysicsTypeComponent`, this.handleUpdate.bind(this));
        app.on(`objectChanged.PhysicsTypeComponent`, this.handleUpdate.bind(this));
    }

    handleExpand(expanded) {
        this.setState({
            expanded,
        });
    }

    handleUpdate() {
        const editor = app.editor;

        if (!editor.selected || editor.selected.userData.type !== 'QuadraticBezierCurve') {
            this.setState({
                show: false,
            });
            return;
        }

        this.selected = editor.selected;

        let points = this.selected.userData.points;

        this.setState({
            show: true,
            v0x: points[0].x,
            v0y: points[0].y,
            v0z: points[0].z,
            v1x: points[1].x,
            v1y: points[1].y,
            v1z: points[1].z,
            v2x: points[2].x,
            v2y: points[2].y,
            v2z: points[2].z,
        });
    }

    handleChange(value, name) {
        if (value === null) {
            this.setState({
                [name]: value,
            });
            return;
        }

        const { v0x, v0y, v0z, v1x, v1y, v1z, v2x, v2y, v2z } = Object.assign({}, this.state, {
            [name]: value,
        });

        this.selected.userData.points = [
            new THREE.Vector3(v0x, v0y, v0z),
            new THREE.Vector3(v1x, v1y, v1z),
            new THREE.Vector3(v2x, v2y, v2z),
        ];

        this.selected.update();

        app.call('objectChanged', this, this.selected);
    }
}

export default PhysicsTypeComponent;