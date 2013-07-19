'''
Created on Jul 18, 2013

@author: Mission Liao
'''

class NotAllowed(Exception):
    """
    exception class represent permission denied
    """
    pass



class Role(object):
    """
    base class for role-type
    """
    pass


class DynamicRole(Role):
    """
    roles generated based on context(relations, for example)
    """
    pass


class StaticRole(Role):
    """
    roles from assignment
    """
    pass


class Resource(object):
    """
    base class for resource-type
    """

    """
    index to the tuple passed to read/write function as sift
    """
    __idx_sift_self = 1
    __idx_sift_all = 2
    __idx_sift_child = 3
    
    def __init__(self, c):
        """
        Constructor, and accept a list of children to form a resource-tree
        
        @param c: a list of children of type C{opair.auth.base.Resource}
        """
        self.child = c
        self.data = None
        
    def __check_perm(self, roles):
        raise NotAllowed()

    def read(self, roles, sift=(True, [])):
        """
        read this resource via provided roles

        @param roles: a list containing role-objects
        initiated from C{opair.auth.base.Role}

        @param sift: an access filter, which is an 3-element
        tuple, first indicate if "all" data(include childrens') should be
        returned. last one is a list of child indexes.

        it will raise exceptions when access is not allowed.
        it will return values as a C{dict}
        """
        
        ret = [
               None,  # data in this resource-node, C{dict}
               {},  # data returned from each child resource node
               [],  # 
               ]
        
        try:
            self.__check_perm(roles)
        except NotAllowed:
            # TODO: report error?
            return None, sift[self.__class__.__idx_sift_child]


        # return "self" data
        if (sift[self.__class__.__idx_sift_self] or
            sift[self.__class__.__idx_sift_all]):
            ret[0] = self.data

        # return "child" data
        

    def write(self, roles, val, sift=(True, False, [])):
        """
        write this resource via provided roles
        
        @param roles: a list containing role-objects
        initiated from C{opair.auth.base.Role}
        
        @param val: a dict containing {key,value} to be updated

        @param sift: an access filter, which is an 3-element
        tuple, first indicate if result should contain data by self.
        second indicate if "all" data(include childrens') should be
        returned. last one is a list of child indexes.   

        it will raise exceptions when access is not allowed.
        it will return the updated value as a C{dict}
        """
        try:
            self.__check_perm(roles)
        except NotAllowed:
            # TODO: report error?
            return None, sift[self.__class__.__idx_sift_child]

