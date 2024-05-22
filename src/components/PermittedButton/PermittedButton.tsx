import React from 'react';
import { Button } from 'antd';
import clsx from 'clsx';
import { isAllowed, isAllowedIcon } from '../../util/helper';

type Permission = {
  can_view: boolean;
  can_create: boolean;
  can_update: boolean;
  can_delete: boolean;
  can_report: boolean;
};

type PermittedButtonType = {
  text: string;
  type: 'primary' | 'default' | 'dashed' | 'link' | 'text';
  className: string;
  handleClick: () => void;
  permission: Permission;
  permissionType: 'view' | 'add' | 'edit' | 'delete' | 'report';
};

const PermittedButton: React.FC<PermittedButtonType> = ({
  text,
  type,
  className,
  handleClick,
  permission,
  permissionType,
}) => {
  
  if (isAllowed(permissionType,permission)) {
    return (
      <div>
        <Button
          type={type}
          icon={isAllowedIcon(permissionType)}
          className={clsx(className, 'flex items-center')}
          onClick={handleClick}
        >
          {text}
        </Button>
      </div>
    );
  }

  return null;
};

export default PermittedButton;